package config

type Config struct {
  Mongo string
}

var GlobalConfig Config

func BuildGlobalConfig(mode string) {
  if (mode == "RELEASE") {
    GlobalConfig = Config{"192.168.99.100:32770"}
  } else {
    GlobalConfig = Config{"192.168.99.100:32770"}
  }
}
