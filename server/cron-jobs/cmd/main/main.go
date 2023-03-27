package main

import (
	"fmt"
	"log"
	"os"

	// "time"

	// "github.com/go-co-op/gocron"
	"github.com/joho/godotenv"

	"cron-jobs/tasks"
)

var googleAPIKey string

// init is invoked before main()
func init() {
	// loads values from .env into the system environment
	if err := godotenv.Load("/home/nice/Workspace/modern-vrank/.env"); err != nil {
		log.Print("No .env file found")
	}

	// Get the MONGO_URI form environment variable
	mongoURI, exists := os.LookupEnv("MONGO_URI")
	if exists {
		fmt.Println("MONGO_URI: ", mongoURI)
	} else {
		fmt.Println("MONGO_URI: Not found")
	}
	// Get the GOOGLE_API_KEY form environment variable
	googleAPIKey, exists := os.LookupEnv("GOOGLE_API_KEY")
	if exists {
		fmt.Println("GOOGLE_API_KEY: ", googleAPIKey)
	} else {
		fmt.Println("GOOGLE_API_KEY: Not found")

	}
}

func main() {
	googleAPIKey, _ := os.LookupEnv("GOOGLE_API_KEY")

	//run script to fetch the data
	tasks.ChannelInfo(googleAPIKey)
	// tasks.VideoStatusAPI(googleAPIKey)

}
