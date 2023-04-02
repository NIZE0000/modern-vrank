// fetch the chennal from youtubeId

package tasks

import (
	"context"
	"cron-jobs/models"
	"cron-jobs/modules"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/mgo.v2/bson"
)

func ChannelInfo(API string) {

	// connect to mongo database
	_, db, err := modules.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}

	// define collection
	channelCollection := db.Collection("channel")
	statsCollection := db.Collection("stats")

	//precalculate outdate time UTC
	lastDay := time.Now().UTC().Truncate(24 * time.Hour)
	fmt.Printf("number of date: %d\n", lastDay.Day())

	// filter outdate time
	filter := bson.M{
		"$or": []bson.M{
			{"updateAt": bson.M{"$lt": lastDay}},
			{"updateAt": bson.M{"$exists": false}},
		},
	}
	// set docs limit to 50
	opts := options.Find().SetLimit(50)

	// read the documents
	result, err := channelCollection.Find(context.TODO(), filter, opts)
	if err != nil {
		panic(err)
	}
	// prepare data to pointer variable
	var channelDocs []models.ChannelModel
	if err = result.All(context.TODO(), &channelDocs); err != nil {
		panic(err)
	}

	// split 50 channels per batch
	channelLists := make([]string, 0)
	for _, result := range channelDocs {
		res, err := json.Marshal(result.ID)
		channelLists = append(channelLists, string(res))
		if err != nil {
			fmt.Println(err)
		}
	}
	fmt.Println("Channels Batch Size: ", len(channelLists))
	fmt.Println(channelLists)

	// Define the API endpoint and query parameters
	endpoint := "https://www.googleapis.com/youtube/v3/channels"

	// get channelId from lists
	for i := 0; i < len(channelLists); i++ {

		channelId := strings.Trim(channelLists[i], "\"")

		// set query parameters
		params := url.Values{}
		params.Add("part", "snippet,statistics")
		params.Add("key", API)
		params.Add("id", channelId)
		url := endpoint + "?" + params.Encode()

		// Send a GET request to the API endpoint
		res, err := http.Get(url)
		if err != nil {
			fmt.Printf("The HTTP request failed with error %s\n", err)
		}

		// Read the response body
		data, _ := io.ReadAll(res.Body)

		// Unmarshal the JSON data into a Go struct
		var channelJson models.ChannelJson
		if err := json.Unmarshal(data, &channelJson); err != nil {
			log.Fatal(err)
		}

		// condition for skip emty data slice
		if channelJson.Items == nil {
			log.Fatalln("Emty ID: " + channelId)
			continue
		}

		// define variable for mapping json data
		var channelModel models.ChannelModel
		// map json to struct
		channelModel.ChannelID = channelJson.Items[0].ID
		channelModel.Title = channelJson.Items[0].Snippet.Title
		channelModel.Description = channelJson.Items[0].Snippet.Description
		channelModel.PublishedAt = primitive.NewDateTimeFromTime(channelJson.Items[0].Snippet.PublishedAt)
		// Map thumbnails
		channelModel.Thumbnails.Default.URL = channelJson.Items[0].Snippet.Thumbnails.Default.URL
		channelModel.Thumbnails.Medium.URL = channelJson.Items[0].Snippet.Thumbnails.Medium.URL
		channelModel.Thumbnails.High.URL = channelJson.Items[0].Snippet.Thumbnails.High.URL
		// Map localized
		channelModel.Localized.Title = channelJson.Items[0].Snippet.Localized.Title
		channelModel.Localized.Description = channelJson.Items[0].Snippet.Localized.Description
		channelModel.Country = channelJson.Items[0].Snippet.Country

		// Map statistics
		channelModel.Statistics.ViewCount = channelJson.Items[0].Statistics.ViewCount
		channelModel.Statistics.SubscriberCount = channelJson.Items[0].Statistics.SubscriberCount
		channelModel.Statistics.HiddenSubscriberCount = channelJson.Items[0].Statistics.HiddenSubscriberCount
		channelModel.Statistics.VideoCount = channelJson.Items[0].Statistics.VideoCount
		// Timestamp UTC
		channelModel.UpdateAt = primitive.NewDateTimeFromTime(time.Now().UTC())

		// Define the update to apply if the document exists
		update := bson.M{"$set": channelModel}

		// Define the options for the update operation
		options := options.Update().SetUpsert(true)

		// insert document
		result, err := channelCollection.UpdateByID(context.TODO(), channelId, update, options)
		if err != nil {
			fmt.Println(err)
			return
		}

		// If the document didn't already exist, output a message to that effect
		if result.UpsertedCount == 1 {
			fmt.Println("New document inserted!")
		} else {
			// fmt.Println("Existing document updated!")
		}

		// ---Stats section---

		// first get timestamps
		currentTime := time.Now().UTC()

		// prepare data to store
		stats := bson.M{
			currentTime.Format("2006-01-02"): map[string]interface{}{
				"ViewCount":       channelModel.Statistics.ViewCount,
				"SubscriberCount": channelModel.Statistics.SubscriberCount,
				"VideoCount":      channelModel.Statistics.VideoCount},
		}

		// Define the update to apply if the document exists
		update = bson.M{"$set": stats}

		_, err = statsCollection.UpdateByID(context.TODO(), channelId, update, options)

		if err != nil {
			panic(err)
		}

	}
}
