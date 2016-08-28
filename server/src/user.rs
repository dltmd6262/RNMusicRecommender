extern crate bodyparser;
extern crate serde_json;

use iron::prelude::*;
use iron::status;
use iron::Handler;
use di::DI;
use std::sync::{Arc, Mutex};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct UserInfo {
    id: String,
    password: String,
}

pub fn login(di: &Arc<Mutex<DI>>) -> Box<Handler> {
    let di_ref = di.clone();
    Box::new(move |req: &mut Request| -> IronResult<Response> {
        let locked_di = di_ref.lock().unwrap();
        let body = req.get::<bodyparser::Raw>().unwrap().unwrap();
        let result: UserInfo = serde_json::from_str(&body).unwrap_or_else(|e| {
            println!("Error while parsing user info: {:?}", e);
            UserInfo{id: "".to_string(), password: "".to_string()}
        });

        if result.id == "" && result.password == "" {
            return Ok(Response::with((status::NoContent)))
        }

        Ok(Response::with((status::Ok)))
    })
}

pub fn signup(di: &Arc<Mutex<DI>>) -> Box<Handler> {
    let di_ref = di.clone();
    Box::new(move |req: &mut Request| -> IronResult<Response> {
        let locked_di = di_ref.lock().unwrap();
        let body = req.get::<bodyparser::Raw>().unwrap().unwrap();
        let result: UserInfo = serde_json::from_str(&body).unwrap_or_else(|e| {
            println!("Error while parsing user info: {:?}", e);
            UserInfo{id: "".to_string(), password: "".to_string()}
        });

        if result.id == "" && result.password == "" {
            return Ok(Response::with((status::NoContent)))
        }

        Ok(Response::with((status::Ok)))
    })
}
