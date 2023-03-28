package config

import (
	"fmt"
	"log"
	"os"
	"sync"

	"github.com/joho/godotenv"
)

type Config struct {
	MongoURI string
}

var once sync.Once
var instance *Config

func Get() *Config {

	once.Do(func() {
		// loads values from .env into the system environment
		if err := godotenv.Load("/home/nice/Workspace/modern-vrank/.env"); err != nil {
			log.Print("No .env file found")
		}
		// check environment
		_, exists := os.LookupEnv("MONGO_URI")
		if !exists {
			fmt.Println("MONGO_URI: Not found")
		}
		// save to variable
		config := Config{
			MongoURI: os.Getenv("MONGO_URI"),
		}
		instance = &config
	})
	return instance
}
