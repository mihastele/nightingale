use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use chrono::Utc;
use lazy_static::lazy_static;
use std::collections::HashMap;
use std::sync::Mutex;
use uuid::Uuid;

use crate::models::BlogPost;

lazy_static! {
    static ref BLOGS: Mutex<HashMap<Uuid, BlogPost>> = Mutex::new(HashMap::new());
}

#[get("/blog")]
async fn list_blogs() -> impl Responder {
    let blogs = BLOGS.lock().unwrap();
    let list: Vec<&BlogPost> = blogs.values().collect();
    HttpResponse::Ok().json(list)
}

#[get("/blog/{id}")]
async fn get_blog(path: web::Path<Uuid>) -> impl Responder {
    let blogs = BLOGS.lock().unwrap();
    if let Some(blog) = blogs.get(&path.into_inner()) {
        return HttpResponse::Ok().json(blog);
    }
    HttpResponse::NotFound().finish()
}

#[post("/blog")]
async fn create_blog(blog: web::Json<BlogPost>) -> impl Responder {
    let mut blogs = BLOGS.lock().unwrap();
    let mut new_blog = blog.into_inner();
    new_blog.id = Uuid::new_v4();
    let now = Utc::now();
    new_blog.created_at = now;
    new_blog.updated_at = now;
    blogs.insert(new_blog.id, new_blog.clone());
    HttpResponse::Ok().json(new_blog)
}

#[put("/blog/{id}")]
async fn update_blog(path: web::Path<Uuid>, blog: web::Json<BlogPost>) -> impl Responder {
    let mut blogs = BLOGS.lock().unwrap();
    let id = path.into_inner();
    if blogs.contains_key(&id) {
        let mut updated = blog.into_inner();
        updated.id = id;
        updated.updated_at = Utc::now();
        blogs.insert(id, updated.clone());
        return HttpResponse::Ok().json(updated);
    }
    HttpResponse::NotFound().finish()
}

#[delete("/blog/{id}")]
async fn delete_blog(path: web::Path<Uuid>) -> impl Responder {
    let mut blogs = BLOGS.lock().unwrap();
    if blogs.remove(&path.into_inner()).is_some() {
        return HttpResponse::Ok().finish();
    }
    HttpResponse::NotFound().finish()
}

pub fn routes(cfg: &mut web::ServiceConfig) {
    cfg.service(list_blogs)
        .service(get_blog)
        .service(create_blog)
        .service(update_blog)
        .service(delete_blog);
}
