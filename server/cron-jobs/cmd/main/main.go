package main

import (
	"context"
	"fmt"
	"log"
	"os"

	// "time"

	// "github.com/go-co-op/gocron"
	"github.com/joho/godotenv"

	"cron-jobs/tasks"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// init is invoked before main()
func init() {
	// loads values from .env into the system
	if err := godotenv.Load("/home/nice/Workspace/modern-vrank/.env"); err != nil {
		log.Print("No .env file found")
	}
}

func main() {
	// Get the GOOGLE_API_KEY environment variable
	googleAPIKey, exists := os.LookupEnv("GOOGLE_API_KEY")

	if exists {
		fmt.Println("GOOGLE_API_KEY: ", googleAPIKey)
	}

	// Connect to the MongoDB server
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}
	err = client.Connect(context.TODO())
	if err != nil {
		log.Fatal(err)
	}
	log.Println(client)
	defer client.Disconnect(context.TODO())

	tasks.VideoStatusAPI(googleAPIKey)

}
