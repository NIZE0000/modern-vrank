// fetch the chennal from youtubeId

package tasks

import (
	"context"
	"cron-jobs/models"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func init() {
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
}

func ChannelInfo(API string) {

	channelList := []string{"UC6KTB79XRwx_iwxnrIEvHQA", "UC72_UWR1CAQhC-Kg48e5mjA", "UC6Ea68DSHlXrcy9uIw4oUIg"}

	// Define the API endpoint and query parameters
	endpoint := "https://www.googleapis.com/youtube/v3/channels"
	params := url.Values{}
	params.Add("part", "snippet")
	params.Add("key", API)

	// get channelId from list
	for _, channelId := range channelList {
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
		var video models.VideoJson
		json.Unmarshal(data, &video)

		// Print the video information
		fmt.Printf("Video ID: %s\n", video.Items[0].ID)

	}

}
