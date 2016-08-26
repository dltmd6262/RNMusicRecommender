use ascii::AsAsciiStr;
use rethinkdb::Client;

pub struct DI<'a> {
    pub Rdb: &'a Client,
}

pub fn init_DI<'a>() -> &'a DI {
    let mut rethinkDB = Client::connect("127.0.0.1:28015",  "".as_ascii_str().unwrap()).unwrap_or_else(|e| {
        println!("Error connecting to Rethink DB: {:?}", e);
        panic!(e);
    });

    let di = DI{
        Rdb: rethinkDB
    };

    &di
}