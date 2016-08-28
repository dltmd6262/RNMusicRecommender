#![feature(plugin, custom_derive, box_syntax)]
#![plugin(serde_macros)]

extern crate iron;
extern crate router;
extern crate rethinkdb;
extern crate ascii;

mod user;
mod newsfeed;
mod di;

use di::{DI};
use iron::prelude::*;
use router::Router;
use rethinkdb::Client;
use ascii::AsAsciiStr;
use std::sync::{Arc, Mutex};

fn main() {
    let mut rethinkDB: Client = Client::connect("127.0.0.1:28015",  "".as_ascii_str().unwrap()).unwrap_or_else(|e| {
        println!("Error connecting to Rethink DB: {:?}", e);
        panic!(e);
    });

    let di_instance = Arc::new(Mutex::new(DI{
        Rdb: rethinkDB
    }));

    let mut router = Router::new();
    router.get("/newsfeed", newsfeed::get_newsfeed(&di_instance));
    router.post("/newsfeed", newsfeed::post_newsfeed(&di_instance));

    router.post("/user/login", user::login(&di_instance));
    router.post("/user/signup", user::signup(&di_instance));

    Iron::new(router).http("localhost:3000").unwrap();
}
