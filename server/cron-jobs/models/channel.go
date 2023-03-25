package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Database maping
type ChannelModel struct {
	ID          string `bson:"_id,omitempty"`
	ChannelID   string `bson:"channelId,omitempty"`
	Title       string `bson:"title,omitempty"`
	Description string `bson:"description,omitempty"`
	Thumbnails  struct {
		Default struct {
			URL string `bson:"url,omitempty"`
		} `bson:"default,omitempty"`
		Medium struct {
			URL string `bson:"url,omitempty"`
		} `bson:"medium,omitempty"`
		High struct {
			URL string `bson:"url,omitempty"`
		} `bson:"high,omitempty"`
	} `bson:"thumbnails,omitempty"`
	Localized struct {
		Title       string `bson:"title,omitempty"`
		Description string `bson:"description,omitempty"`
	} `bson:"localized,omitempty"`
	Statistics struct {
		ViewCount             string `bson:"viewCount,omitempty"`
		SubscriberCount       string `bson:"subscriberCount,omitempty"`
		HiddenSubscriberCount bool   `bson:"hiddenSubscriberCount,omitempty"`
		VideoCount            string `bson:"videoCount,omitempty"`
	} `bson:"statistics,omitempty"`
	UpdateAt primitive.DateTime `bson:"updateAt,omitempty"`
}

type ChannelModelWithoutID struct {
	ChannelID   string `bson:"channelId,omitempty"`
	Title       string `bson:"title,omitempty"`
	Description string `bson:"description,omitempty"`
	Thumbnails  struct {
		Default struct {
			URL string `bson:"url,omitempty"`
		} `bson:"default,omitempty"`
		Medium struct {
			URL string `bson:"url,omitempty"`
		} `bson:"medium,omitempty"`
		High struct {
			URL string `bson:"url,omitempty"`
		} `bson:"high,omitempty"`
	} `bson:"thumbnails,omitempty"`
	Localized struct {
		Title       string `bson:"title,omitempty"`
		Description string `bson:"description,omitempty"`
	} `bson:"localized,omitempty"`
	Statistics struct {
		ViewCount             string `bson:"viewCount,omitempty"`
		SubscriberCount       string `bson:"subscriberCount,omitempty"`
		HiddenSubscriberCount bool   `bson:"hiddenSubscriberCount,omitempty"`
		VideoCount            string `bson:"videoCount,omitempty"`
	} `bson:"statistics,omitempty"`
	UpdateAt primitive.DateTime `bson:"updateAt,omitempty"`
}

// Json maping
type ChannelJson struct {
	Kind     string `json:"kind"`
	Etag     string `json:"etag"`
	PageInfo struct {
		TotalResults   int `json:"totalResults"`
		ResultsPerPage int `json:"resultsPerPage"`
	} `json:"pageInfo"`
	Items []struct {
		Kind    string `json:"kind"`
		Etag    string `json:"etag"`
		ID      string `json:"id"`
		Snippet struct {
			Title       string    `json:"title"`
			Description string    `json:"description"`
			CustomURL   string    `json:"customUrl"`
			PublishedAt time.Time `json:"publishedAt"`
			Thumbnails  struct {
				Default struct {
					URL    string `json:"url"`
					Width  int    `json:"width"`
					Height int    `json:"height"`
				} `json:"default"`
				Medium struct {
					URL    string `json:"url"`
					Width  int    `json:"width"`
					Height int    `json:"height"`
				} `json:"medium"`
				High struct {
					URL    string `json:"url"`
					Width  int    `json:"width"`
					Height int    `json:"height"`
				} `json:"high"`
			} `json:"thumbnails"`
			Localized struct {
				Title       string `json:"title"`
				Description string `json:"description"`
			} `json:"localized"`
		} `json:"snippet"`
		Statistics struct {
			ViewCount             string `json:"viewCount"`
			SubscriberCount       string `json:"subscriberCount"`
			HiddenSubscriberCount bool   `json:"hiddenSubscriberCount"`
			VideoCount            string `json:"videoCount"`
		} `json:"statistics"`
	} `json:"items"`
}
