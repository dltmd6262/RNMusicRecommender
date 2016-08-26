#![feature(plugin, custom_derive, box_syntax)]
#![plugin(serde_macros)]

extern crate iron;
extern crate router;
extern crate rethinkdb;
extern crate ascii;

mod user;
mod newsfeed;
mod di;

use di::{DI, init_DI};
use iron::prelude::*;
use router::Router;

fn main() {
    let di_instance: &'static DI = init_DI();

    let dd = newsfeed::get_newsfeed(di_instance);
    let gg = newsfeed::post_newsfeed(di_instance);

    let mut router = Router::new();
    router.get("/newsfeed", dd);
    router.post("/newsfeed", gg);

    router.post("/user/login", user::login);
    router.post("/user/signup", user::signup);

    Iron::new(router).http("localhost:3000").unwrap();
}
