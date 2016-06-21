package main

import (
  "flag"
  "fmt"
  "github.com/codegangsta/negroni"
  "github.com/gorilla/mux"
  "./user"
  "./newsfeed"
  "./di"
  "./config"
  mgo "gopkg.in/mgo.v2"
)

func main() {
  mode := flag.String("mode", "DEV", "Mode of server")
  config.BuildGlobalConfig(*mode);

  session, err := mgo.Dial(config.GlobalConfig.Mongo)
  if err != nil {
    fmt.Printf("%v", err)
    return
  }

  NewsfeedCollection := session.DB("real_pitch").C("newsfeed")
  UserCollection := session.DB("real_pitch").C("user")

  di := di.DI{NewsfeedCollection, UserCollection}

  router := mux.NewRouter()

  newsfeedRoute := router.Path("/newsfeed").Subrouter()
  newsfeedRoute.Methods("GET").HandlerFunc(newsfeed.GetNewsFeed(&di))
  newsfeedRoute.Methods("POST").HandlerFunc(newsfeed.AddNewsFeed(&di))

  userRoute := router.PathPrefix("/user").Subrouter()
  userRoute.Path("/login").Methods("POST").HandlerFunc(user.LoginUser(&di))
  userRoute.Path("/signup").Methods("POST").HandlerFunc(user.SignUpUser(&di))

  n := negroni.New()
  n.UseHandler(router)

  n.Run(":8080")
}
