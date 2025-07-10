use actix::prelude::*;
use actix_web::{get, web, Error, HttpRequest, HttpResponse};
use actix_web_actors::ws;
use dashmap::DashMap;
use lazy_static::lazy_static;
use std::time::{Duration, Instant};

lazy_static! {
    // room_id => Vec of session addresses
    static ref ROOMS: DashMap<String, Vec<Addr<CallSession>>> = DashMap::new();
}

/// Wrapper message so we can forward text to other peers
#[derive(Message)]
#[rtype(result = "()")] // no result
struct ForwardText(pub String);

pub struct CallSession {
    room: String,
    hb: Instant,
}

impl Actor for CallSession {
    type Context = ws::WebsocketContext<Self>;

    /// Register self in room once started
    fn started(&mut self, ctx: &mut Self::Context) {
        let addr = ctx.address();
        ROOMS.entry(self.room.clone()).or_default().push(addr);
        self.hb(ctx);
    }

    fn stopped(&mut self, _ctx: &mut Self::Context) {
        if let Some(mut vec) = ROOMS.get_mut(&self.room) {
            vec.retain(|a| a.connected());
        }
    }
}

impl CallSession {
    fn new(room: String) -> Self {
        Self { room, hb: Instant::now() }
    }

    /// helper for heartbeats to keep connection alive
    fn hb(&self, ctx: &mut ws::WebsocketContext<Self>) {
        ctx.run_interval(Duration::from_secs(5), |act, ctx| {
            if Instant::now().duration_since(act.hb) > Duration::from_secs(10) {
                // heartbeat timed out
                ctx.stop();
                return;
            }
            ctx.ping(b"ping");
        });
    }
}

impl Handler<ForwardText> for CallSession {
    type Result = ();

    fn handle(&mut self, msg: ForwardText, ctx: &mut Self::Context) {
        ctx.text(msg.0);
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for CallSession {
    fn handle(&mut self, item: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match item {
            Ok(ws::Message::Text(text)) => {
                // forward to other sessions in same room
                if let Some(vec) = ROOMS.get(&self.room) {
                    for addr in vec.iter() {
                        if addr.connected() && *addr != ctx.address() {
                            let _ = addr.do_send(ForwardText(text.clone().to_string()));
                        }
                    }
                }
            }
            Ok(ws::Message::Ping(msg)) => {
                self.hb = Instant::now();
                ctx.pong(&msg);
            }
            Ok(ws::Message::Pong(_)) => {
                self.hb = Instant::now();
            }
            Ok(ws::Message::Close(reason)) => {
                ctx.close(reason);
                ctx.stop();
            }
            _ => {}
        }
    }
}

#[get("/ws/call/{room}")]
pub async fn call_route(path: web::Path<String>, req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    let room = path.into_inner();
    ws::start(CallSession::new(room), &req, stream)
}
