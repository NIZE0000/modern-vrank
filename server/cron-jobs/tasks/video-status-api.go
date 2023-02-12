// fetch the video status by videoId

package tasks

import (
	"cron-jobs/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

func VideoStatusAPI(API string) {

	videoId := "AROi9sNCVKs"

	// Define the API endpoint and query parameters
	endpoint := "https://www.googleapis.com/youtube/v3/videos"
	params := url.Values{}
	params.Add("part", "snippet")
	params.Add("id", videoId)
	params.Add("key", API)
	url := endpoint + "?" + params.Encode()

	// Send a GET request to the API endpoint
	res, err := http.Get(url)
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	}

	// Read the response body
	data, _ := ioutil.ReadAll(res.Body)

	// Unmarshal the JSON data into a Go struct
	var video models.Video
	json.Unmarshal(data, &video)

	// Print the video information
	fmt.Printf("Video ID: %s\n", video.Items[0].ID)

}
