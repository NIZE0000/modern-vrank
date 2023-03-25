package modules

import (
	"context"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB() (*mongo.Client, *mongo.Database, error) {

	// Get the MONGO_URI form environment variable
	mongoURI, _ := os.LookupEnv("MONGO_URI")

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
