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

// init is invoked before main()
func init() {
	// loads values from .env into the system
	if err := godotenv.Load("/home/nice/Workspace/modern-vrank/.env"); err != nil {
		log.Print("No .env file found")
	}
}

func main() {
	// Get the GITHUB_USERNAME environment variable
	googleAPIKey, exists := os.LookupEnv("GOOGLE_API_KEY")

	if exists {
		fmt.Println(googleAPIKey)
	}

	tasks.VideoStatusAPI(googleAPIKey)

}
