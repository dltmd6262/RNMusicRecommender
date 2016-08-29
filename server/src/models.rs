#[derive(Debug, Serialize, Deserialize, Default)]
pub struct Newsfeed {
    pub id: Option<i32>,
    pub title: String,
    pub artist: String,
    pub inst: String,
}
