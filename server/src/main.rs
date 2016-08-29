#![feature(plugin, custom_derive, box_syntax)]
#![plugin(serde_macros)]
#![cfg_attr(test, plugin(stainless))]

extern crate iron;
extern crate router;
extern crate postgres;

mod user;
mod newsfeed;
mod di;
mod models;

use di::init_di;
use iron::prelude::*;
use router::Router;

fn main() {
    let di_instance = init_di();

    let mut router = Router::new();
    router.get("/newsfeed", newsfeed::get_newsfeed(&di_instance));
    router.post("/newsfeed", newsfeed::post_newsfeed(&di_instance));

    router.post("/user/login", user::login(&di_instance));
    router.post("/user/signup", user::signup(&di_instance));

    Iron::new(router).http("0.0.0.0:3000").unwrap();
}
