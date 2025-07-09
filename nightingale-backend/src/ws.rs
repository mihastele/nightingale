use actix::prelude::*;
use actix_web::{get, web, Error, HttpRequest, HttpResponse};
use actix_web_actors::ws;

pub struct ChatSession;

impl Actor for ChatSession {
    type Context = ws::WebsocketContext<Self>;
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for ChatSession {
    fn handle(&mut self, item: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        if let Ok(msg) = item {
            match msg {
                ws::Message::Text(text) => ctx.text(text), // echo for now
                ws::Message::Ping(msg) => ctx.pong(&msg),
                ws::Message::Close(reason) => {
                    ctx.close(reason);
                    ctx.stop();
                }
                _ => (),
            }
        }
    }
}

#[get("/ws/chat")]
pub async fn chat_route(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    ws::start(ChatSession {}, &req, stream)
}
