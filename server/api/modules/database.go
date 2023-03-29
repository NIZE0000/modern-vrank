package modules

import (
	"context"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var mongoURI string

func ConnectDB() (*mongo.Client, *mongo.Database, error) {

	var exists bool
	// Get the MONGO_URI form environment variable
	mongoURI, exists = os.LookupEnv("MONGO_URI")
	if exists {
		// fmt.Println("MONGO_URI: ", mongoURI)
	} else {
		fmt.Println("MONGO_URI: Not found")
	}

	// Set client options
	clientOptions := options.Client().ApplyURI(mongoURI)

	// Connect to MongoDB
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return nil, nil, err
	}

	// Check the connection
	err = client.Ping(context.Background(), nil)
	if err != nil {
		return nil, nil, err
	}

	// Access a vrank database
	db := client.Database("vrank")

	return client, db, nil
}
