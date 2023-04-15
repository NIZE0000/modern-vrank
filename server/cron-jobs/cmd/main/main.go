package main

import (
	"cron-jobs/tasks"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/robfig/cron/v3"
)

var googleAPIKey string

// init is invoked before main()
func init() {

	// Set the log output to stdout
	log.SetOutput(os.Stdout)

	// loads values from .env into the system environment
	if err := godotenv.Load("/home/nice/Workspace/modern-vrank/.env"); err != nil {
		log.Println("No .env file found")
	}

	// Get the MONGO_URI form environment variable
	mongoURI, exists := os.LookupEnv("MONGO_URI")
	if exists {
		log.Println("MONGO_URI: ", mongoURI)
	} else {
		log.Println("MONGO_URI: Not found")
	}
	// Get the GOOGLE_API_KEY form environment variable
	googleAPIKey, exists = os.LookupEnv("GOOGLE_API_KEY")
	if exists {
		log.Println("GOOGLE_API_KEY: ", googleAPIKey)
	} else {
		log.Println("GOOGLE_API_KEY: Not found")

	}

}

func main() {

	// make instance for cron jobs
	c := cron.New()
	tasks.ChannelInfo(googleAPIKey)

	// get environment variable
	SCHEDULE_CHANNEL_INFO, _ := os.LookupEnv("SCHEDULE_CHANNEL_INFO")

	// Add a job to the scheduler
	c.AddFunc(SCHEDULE_CHANNEL_INFO, func() {
		// script to fetch the data
		log.Println("---Start ChannelInfo Script---")
		tasks.ChannelInfo(googleAPIKey)
	})
	// c.AddFunc("", func() {
	// 	tasks.VideoStatusAPI(googleAPIKey)
	// })

	// Start the scheduler
	go c.Start()

	// use select to implement infinty loop
	select {}
}
