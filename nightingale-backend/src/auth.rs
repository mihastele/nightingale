use actix_web::{post, web, HttpResponse, Responder};
use jsonwebtoken::{encode, EncodingKey, Header};
use lazy_static::lazy_static;
use std::collections::HashMap;
use std::sync::Mutex;
use uuid::Uuid;

use crate::models::{LoginRequest, LoginResponse, RegisterRequest, User};

lazy_static! {
    static ref USERS: Mutex<HashMap<String, User>> = Mutex::new(HashMap::new());
}

const SECRET: &[u8] = b"CHANGE_ME_SECRET";

#[post("/register")]
async fn register(req: web::Json<RegisterRequest>) -> impl Responder {
    let mut users = USERS.lock().unwrap();
    if users.contains_key(&req.username) {
        return HttpResponse::BadRequest().body("username taken");
    }
    let user = User {
        id: Uuid::new_v4(),
        username: req.username.clone(),
        password_hash: req.password.clone(), // TODO: hash using argon2
    };
    users.insert(user.username.clone(), user);
    HttpResponse::Ok().finish()
}

#[post("/login")]
async fn login(req: web::Json<LoginRequest>) -> impl Responder {
    let users = USERS.lock().unwrap();
    if let Some(user) = users.get(&req.username) {
        if user.password_hash == req.password {
            let token = encode(&Header::default(), &user, &EncodingKey::from_secret(SECRET)).unwrap();
            return HttpResponse::Ok().json(LoginResponse { token });
        }
    }
    HttpResponse::Unauthorized().body("invalid credentials")
}

pub fn routes(cfg: &mut web::ServiceConfig) {
    cfg.service(register).service(login);
}
