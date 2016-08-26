extern crate bodyparser;
extern crate serde_json;

use iron::prelude::*;
use iron::status;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct UserInfo {
    id: String,
    password: String,
}

pub fn login(req: &mut Request) -> IronResult<Response> {
    let body = req.get::<bodyparser::Raw>().unwrap().unwrap();
    let result: UserInfo = serde_json::from_str(&body).unwrap_or_else(|e| {
        println!("Error while parsing user info: {:?}", e);
        UserInfo{id: "".to_string(), password: "".to_string()}
    });

    if result.id == "" && result.password == "" {
        return Ok(Response::with((status::NoContent)))
    }

    Ok(Response::with((status::Ok)))
}

pub fn signup(req: &mut Request) -> IronResult<Response> {
    let body = req.get::<bodyparser::Raw>().unwrap().unwrap();
    let result: UserInfo = serde_json::from_str(&body).unwrap_or_else(|e| {
        println!("Error while parsing user info: {:?}", e);
        UserInfo{id: "".to_string(), password: "".to_string()}
    });

    if result.id == "" && result.password == "" {
        return Ok(Response::with((status::NoContent)))
    }

    Ok(Response::with((status::Ok)))
}