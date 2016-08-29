#![feature(plugin, custom_derive, box_syntax)]
#![plugin(serde_macros)]

extern crate iron;
extern crate router;
extern crate postgres;

mod user;
mod newsfeed;
mod di;
mod models;

use di::{DI};
use postgres::{Connection, SslMode};
use iron::prelude::*;
use router::Router;
use std::sync::{Arc, Mutex};

fn main() {
    let conn = Connection::connect("postgres://postgres@localhost", SslMode::None).unwrap();
    let di_instance = Arc::new(Mutex::new(DI{
        postgres: conn
    }));

    let mut router = Router::new();
    router.get("/newsfeed", newsfeed::get_newsfeed(&di_instance));
    router.post("/newsfeed", newsfeed::post_newsfeed(&di_instance));

    router.post("/user/login", user::login(&di_instance));
    router.post("/user/signup", user::signup(&di_instance));

    Iron::new(router).http("localhost:3000").unwrap();
}
