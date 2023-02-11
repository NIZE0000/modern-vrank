package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
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
	githubUsername, exists := os.LookupEnv("GOOGLE_API_KEY")

	if exists {
		fmt.Println(githubUsername)
	}

	// Get the GITHUB_API_KEY environment variable
	githubAPIKey, exists := os.LookupEnv("GITHUB_API_KEY")

	if exists {
		fmt.Println(githubAPIKey)
	}
}
