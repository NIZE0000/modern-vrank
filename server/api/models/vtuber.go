package models

type Vtuber struct {
	ID                string    `json:"id"`
	YoutubeId         string    `json:"youtubeId"`
	PlaylistId        string    `json:"playlistId"`
	Title             string    `json:"title"`
	Description       string    `json:"description"`
	SubscriptionCount string    `json:"subscriptionCount"`
	PublishedAt       string    `json:"publishedAt"`
	Thumbnails        Thumbnail `json:"thumbnails"`
	Statistics        Statistic `json:"statistics"`
}

type Thumbnail struct {
	small struct {
		Url string `json:"url"`
	} `json:"default"`
	medium struct {
		Url string `json:"url"`
	} `json:"medium"`
	high struct {
		Url string `json:"url"`
	} `json:"high"`
}

type Statistic struct {
	ViewCount     int `json:"viewCount"`
	LikeCount     int `json:"likeCount"`
	DislikeCount  int `json:"dislikeCount"`
	FavoriteCount int `json:"favoriteCount"`
	CommentCount  int `json:"commentCount"`
}
