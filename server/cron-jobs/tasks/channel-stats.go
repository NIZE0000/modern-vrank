package tasks

import (
	"cron-jobs/modules"
	"log"
	"time"

	"gopkg.in/mgo.v2/bson"
)

func ChannelStats(API string) {

	// connect to mongo database
	_, db, err := modules.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}

	// define collection
	channelCollection := db.Collection("channel")
	statsCollection := db.Collection("stats")

	// get timestamps
	currentTime := time.Now()

	// prepare data to store
	newDoc := bson.M{
		"_id": "",
		currentTime.Format(time.RFC3339): map[string]interface{}{
			"ViewCount":             100,
			"SubscriberCount":       100,
			"HiddenSubscriberCount": true,
			"VideoCount":            100},
	}

	data, err := bson.Marshal(newDoc)
	if err != nil {
		panic(err)
	}
	text := string(data)
	print(text)
}
