use postgres::Connection;

pub struct DI {
    pub postgres: Connection,
}
