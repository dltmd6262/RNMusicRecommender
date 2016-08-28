use iron::Handler;
use iron::prelude::*;
use iron::status;
use router::Router;
use di::DI;
use std::sync::{Arc, Mutex};

pub fn get_newsfeed(di: &Arc<Mutex<DI>>) -> Box<Handler> {
    let di_ref = di.clone();
    Box::new(move |req: &mut Request| -> IronResult<Response> {
        let ref query = req.extensions.get::<Router>().unwrap().find("query").unwrap_or("/");
        let locked_di = di_ref.lock().unwrap();
        Ok(Response::with((status::Ok, *query)))
    })
}

pub fn post_newsfeed(di: &Arc<Mutex<DI>>) -> Box<Handler> {
    let di_ref = di.clone();
    Box::new(move |req: &mut Request| -> IronResult<Response> {
        let ref query = req.extensions.get::<Router>().unwrap().find("query").unwrap_or("/");
        let locked_di = di_ref.lock().unwrap();
        Ok(Response::with((status::Ok, *query)))
    })
}
