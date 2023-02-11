// fetch the video status by videoId

package tasks

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type Video struct {
	Title string   `json:"title"`
	Tags  []string `json:"tags"`
}

func VideoStatusAPI(API string) {

	videoId := "AROi9sNCVKs"

	response, err := http.Get(fmt.Sprintf("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=%v&key=%v", videoId, API))
	if err != nil {
		panic(err)
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		panic(err)
	}

	var data struct {
		// Snippet []string `json:"snippet"`
		Items []Video `json:"items"`
	}

	if err := json.Unmarshal(body, &data); err != nil {
		panic(err)
	}

	fmt.Println(data)

	// for _, item := range data.Items {
	// 	fmt.Println("Title:", item.Title)
	// 	fmt.Println("Tags:", item.Tags)
	// }
}
