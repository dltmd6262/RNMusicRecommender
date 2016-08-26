use iron::Handler;
use iron::prelude::*;
use iron::status;
use router::Router;
use di::DI;

pub fn get_newsfeed(di: &'static DI) -> Box<Handler> {
    Box::new(move |req: &mut Request| -> IronResult<Response> {
        let ref query = req.extensions.get::<Router>().unwrap().find("query").unwrap_or("/");
        println!("{:?}", &query);
        println!("1111 {:?}", &di.Rdb);
        Ok(Response::with((status::Ok, *query)))
    })
}

pub fn post_newsfeed(di: &'static DI) -> Box<Handler> {
    Box::new(move |req: &mut Request| -> IronResult<Response> {
        let ref query = req.extensions.get::<Router>().unwrap().find("query").unwrap_or("/");
        println!("{:?}", &query);
        println!("2020 {:?}", &di.Rdb);
        Ok(Response::with((status::Ok, *query)))
    })
}
