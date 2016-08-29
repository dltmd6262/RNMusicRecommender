use postgres::{Connection, SslMode};
use std::sync::{Arc, Mutex};

pub struct DI {
    pub postgres: Connection,
}

pub fn init_di () -> Arc<Mutex<DI>> {
    let conn = Connection::connect("postgres://postgres@localhost", SslMode::None).unwrap();
    Arc::new(Mutex::new(DI{
        postgres: conn
    }))
}
