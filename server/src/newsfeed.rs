extern crate bodyparser;
extern crate serde_json;

use iron::Handler;
use iron::prelude::*;
use iron::status;
use di::DI;
use std::sync::{Arc, Mutex};
use models::Newsfeed;
use postgres::Connection;

fn get_all_newsfeed(db: &Connection) -> Vec<Newsfeed> {
    let mut res = Vec::new();
    let select_query = db.query("SELECT * FROM rp.newsfeed", &[]);

    if select_query.is_err() {
        println!("Error while fetching newsfeed {:?}", select_query.err());
        return res
    }

    for row in select_query.unwrap().iter() {
        res.push(Newsfeed{
            id: row.get(0),
            title: row.get(1),
            artist: row.get(2),
            inst: row.get(3),
        });
    }
    res
}


pub fn get_newsfeed(di: &Arc<Mutex<DI>>) -> Box<Handler> {
    let di_ref = di.clone();
    Box::new(move |_: &mut Request| -> IronResult<Response> {
        let locked_di = di_ref.lock().unwrap();
        let res = get_all_newsfeed(&locked_di.postgres);
        let serialized = serde_json::to_string(&res).unwrap();

        Ok(Response::with((status::Ok, serialized)))
    })
}

pub fn post_newsfeed(di: &Arc<Mutex<DI>>) -> Box<Handler> {
    let di_ref = di.clone();
    Box::new(move |req: &mut Request| -> IronResult<Response> {
        let body = req.get::<bodyparser::Raw>();
        let parsed_body: Newsfeed;
        match body {
            Ok(Some(body)) => {
                println!("Read body:\n{}", body);
                parsed_body = serde_json::from_str(&body).unwrap_or_else(|e| {
                    println!("Error parsing body {:?}", e);
                    return Default::default()
                });
            },
            _ => {
                println!("Error parsing or no body");
                return Ok(Response::with((status::BadRequest)))
            }
        };

        println!("5353 {:?}", parsed_body);

        let locked_di = di_ref.lock().unwrap();

        let insert_statement = "INSERT INTO rp.newsfeed (title, artist, inst) VALUES ($1, $2, $3)";
        locked_di.postgres.execute(insert_statement, &[&parsed_body.title, &parsed_body.artist, &parsed_body.inst])
            .unwrap_or_else(|e| {
                println!("Error while inserting new item to newsfeed {:?}", e);
                0
            });

        Ok(Response::with((status::Ok, "ll")))
    })
}
