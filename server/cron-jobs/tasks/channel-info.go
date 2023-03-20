// fetch the chennal from youtubeId

package tasks

import (
	"cron-jobs/models"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
)

func ChannelInfo(API string) {

	// // connect to mongo database
	// _, db, err := modules.ConnectDB()
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// // define collection
	// collection := db.Collection("channel")

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
		var channel models.ChannelJson
		json.Unmarshal(data, &channel)

		// Print the video information
		fmt.Printf("Channel ID: %s\n", channel.Items[0].ID)

	}

	// // insert document
	// result, err := collection.InsertOne(context.Background(), bson.M{"name": "John Doe", "age": 30})
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println("Inserted document with ID:", result.InsertedID)
}
