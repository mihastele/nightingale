use actix_web::{web, App, HttpServer};
use env_logger::Env;
mod auth;
mod blog;
mod ws;
mod models;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::Builder::from_env(Env::default().default_filter_or("info")).init();

    HttpServer::new(|| {
        App::new()
            .wrap(actix_cors::Cors::permissive())
            .service(web::scope("/api")
                .configure(auth::routes)
                .configure(blog::routes))
            .service(ws::chat_route)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}

