package tasks

import (
	"bufio"
	"context"
	"cron-jobs/modules"
	"fmt"
	"log"
	"os"
	"strings"

	"gopkg.in/mgo.v2/bson"
)

func T() {

	os.Setenv("MONGO_URI", "mongodb://root:abG8ve96qE5YaumA@167.71.200.211:27017")

	// connect to mongo database
	_, db, err := modules.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}

	// define collection
	channelCollection := db.Collection("channel")

	// Open the file for reading
	file, err := os.Open("/home/nice/Documents/text.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer file.Close()

	// Create a scanner to read the file line by line
	scanner := bufio.NewScanner(file)
	var stringsList []string
	// Loop through each line of the file
	for scanner.Scan() {
		// Split the line into individual strings based on the comma delimiter
		stringsList = strings.Split(scanner.Text(), ",")

		// Print the list of strings
		fmt.Println(stringsList)
	}

	// Check for any errors that occurred during the scanning process
	if err := scanner.Err(); err != nil {
		fmt.Println("Error:", err)
		return
	}

	// // Define the options for the update operation
	// options := options.Update().SetUpsert(true)

	for i, s := range stringsList {
		_, err = channelCollection.InsertOne(context.TODO(), bson.M{"_id": s})
		fmt.Println(i)
		fmt.Println(err)

	}
}
