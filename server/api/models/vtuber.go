package models

type Vtuber struct {
	id                string
	youtubeId         string
	playlistId        string
	title             string
	description       string
	subscriptionCount string
	publishedAt       string
	thumbnails        Thumbnail
	statistics        Statistic
}

type Thumbnail struct {
	small struct {
		url string
	}
	medium struct {
		url string
	}
	high struct {
		url string
	}
}

type Statistic struct {
	viewCount     int
	likeCount     int
	dislikeCount  int
	favoriteCount int
	commentCount  int
}
