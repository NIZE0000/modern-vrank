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
	collection := db.Collection("channel")

	// will separate to 50 per batch size
	channelList := []string{"UC6KTB79XRwx_iwxnrIEvHQA", "UC72_UWR1CAQhC-Kg48e5mjA", "UC6Ea68DSHlXrcy9uIw4oUIg"}

	// Define the API endpoint and query parameters
	endpoint := "https://www.googleapis.com/youtube/v3/channels"

	// get channelId from list
	for _, channelId := range channelList {

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
		json.Unmarshal(data, &channelJson)

		// map json to struct
		channelModel := models.ChannelModel{
			ID:          channelJson.Items[0].ID,
			ChannelId:   channelJson.Items[0].ID,
			Title:       channelJson.Items[0].Snippet.Title,
			Description: channelJson.Items[0].Snippet.Description,
			Thumbnails: struct {
				Default struct{ URL string }
				Medium  struct{ URL string }
				High    struct{ URL string }
			}{Default: struct{ URL string }{URL: channelJson.Items[0].Snippet.Thumbnails.Default.URL},
				Medium: struct{ URL string }{URL: channelJson.Items[0].Snippet.Thumbnails.Medium.URL},
				High:   struct{ URL string }{URL: channelJson.Items[0].Snippet.Thumbnails.High.URL}},
			Localized: struct {
				Title       string
				Description string
			}{Title: channelJson.Items[0].Snippet.Localized.Title, Description: channelJson.Items[0].Snippet.Localized.Description},
			Statistics: struct {
				ViewCount             string
				SubscriberCount       string
				HiddenSubscriberCount bool
				VideoCount            string
			}{
				ViewCount:             channelJson.Items[0].Statistics.ViewCount,
				SubscriberCount:       channelJson.Items[0].Statistics.SubscriberCount,
				HiddenSubscriberCount: channelJson.Items[0].Statistics.HiddenSubscriberCount,
				VideoCount:            channelJson.Items[0].Statistics.VideoCount,
			},
			UpdateAt: primitive.NewDateTimeFromTime(time.Now()),
		}

		// Define the filter to use for the update operation
		filter := bson.M{"_id": channelId}

		// Define the update to apply if the document exists
		update := bson.M{"$set": channelModel}

		// Define the options for the update operation
		upsert := true
		options := options.Update().SetUpsert(upsert)

		// insert document
		result, err := collection.UpdateOne(context.Background(), filter, update, options)
		if err != nil {
			fmt.Println(err)
			return
		}

		// If the document didn't already exist, output a message to that effect
		if result.UpsertedCount == 1 {
			fmt.Println("New document inserted!")
		} else {
			fmt.Println("Existing document updated!")
		}

	}
}
