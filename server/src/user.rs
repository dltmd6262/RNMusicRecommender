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
        let body = req.get::<bodyparser::Raw>().unwrap();

        if body.is_none() {
            println!("no body (uid, pw) received for login");
            return Ok(Response::with((status::BadRequest)))
        }

        let result: UserInfo = serde_json::from_str(&body.unwrap()).unwrap_or_else(|e| {
            println!("Error while parsing uid and pw: {:?}", e);
            UserInfo{id: "".to_string(), password: "".to_string()}
        });

        let dup_query = format!("SELECT count(*) FROM rp.user WHERE (uid='{}' AND pw='{}')", result.id, result.password);
        let duplicate = locked_di.postgres.query(&dup_query, &[]);

        if duplicate.is_err() {
            println!("Error while checking DB {:?}", duplicate.err());
            return Ok(Response::with((status::InternalServerError)))
        }

        let count: i64 = duplicate.unwrap().get(0).get(0);

        if count == 0 {
            println!("Wrong id or password");
            return Ok(Response::with((status::BadRequest)))
        }

        Ok(Response::with((status::Ok)))
    })
}

pub fn signup(di: &Arc<Mutex<DI>>) -> Box<Handler> {
    let di_ref = di.clone();
    Box::new(move |req: &mut Request| -> IronResult<Response> {
        let locked_di = di_ref.lock().unwrap();
        let body = req.get::<bodyparser::Raw>().unwrap();

        if body.is_none() {
            println!("no body (uid, pw) received for login");
            return Ok(Response::with((status::BadRequest)))
        }

        let result: UserInfo = serde_json::from_str(&body.unwrap()).unwrap_or_else(|e| {
            println!("Error while parsing uid and pw: {:?}", e);
            UserInfo{id: "".to_string(), password: "".to_string()}
        });

        if result.id == "" || result.password == "" {
            return Ok(Response::with((status::NoContent)))
        }

        let dup_query = format!("SELECT count(*) FROM rp.user WHERE uid='{}'", result.id);
        let duplicate = locked_di.postgres.query(&dup_query, &[]);

        if duplicate.is_err() {
            println!("Error while checking DB {:?}", duplicate.err());
            return Ok(Response::with((status::InternalServerError)))
        }

        let count: i64 = duplicate.unwrap().get(0).get(0);

        if count != 0 {
            println!("Duplicate id");
            return Ok(Response::with((status::BadRequest)))
        }

        let signup_result = locked_di.postgres.execute("INSERT INTO rp.user (uid, pw) VALUES ($1, $2)", &[&result.id, &result.password]);

        if signup_result.is_err() {
            println!("Internal db error: {:?}", signup_result.err());
            return Ok(Response::with((status::InternalServerError)))
        }

        Ok(Response::with((status::Ok)))
    })
}
