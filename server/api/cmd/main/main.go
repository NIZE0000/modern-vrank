package main

import (
	"log"
	"vrank-api/routes"

	"github.com/joho/godotenv"
)

func init() {
	// loads values from .env into the system environment
	if err := godotenv.Load("/home/nice/Workspace/modern-vrank/.env"); err != nil {
		log.Print("No .env file found")
	}

}

func main() {
	r := routes.SetupRouter()
	r.Run(":8080") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
