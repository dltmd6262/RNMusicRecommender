package config

type Config struct {
  Mongo string
}

var GlobalConfig Config

func BuildGlobalConfig(mode string) {
  if (mode == "RELEASE") {
    GlobalConfig = Config{"192.168.99.100:32770"}
  } else if (mode == "LOCAL") {
    GlobalConfig = Config{"127.0.0.1:27017"}
  } else {
    GlobalConfig = Config{"127.0.0.1:27017"}
  }
}
