package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Model for return data to json
type Channel struct {
	ChannelID   string             `bson:"channelId,omitempty" json:"channelId"`
	Title       string             `bson:"title,omitempty" json:"title"`
	Description string             `bson:"description,omitempty" json:"description"`
	PublishedAt primitive.DateTime `bson:"publishedAt,omitempty" json:"publishedAt"`
	Thumbnails  struct {
		Default struct {
			URL string `bson:"url,omitempty" json:"url"`
		} `bson:"default,omitempty" json:"default"`
		Medium struct {
			URL string `bson:"url,omitempty" json:"url"`
		} `bson:"medium,omitempty" json:"medium"`
		High struct {
			URL string `bson:"url,omitempty" json:"url"`
		} `bson:"high,omitempty" json:"high"`
	} `bson:"thumbnails,omitempty" json:"thumbnails"`
	Country    string `bson:"country" json:"country"`
	Statistics struct {
		ViewCount             int  `bson:"viewCount,omitempty" json:"viewCount"`
		SubscriberCount       int  `bson:"subscriberCount,omitempty" json:"subscriberCount"`
		HiddenSubscriberCount bool `bson:"hiddenSubscriberCount,omitempty" json:"hiddenSubscriberCount"`
		VideoCount            int  `bson:"videoCount,omitempty" json:"videoCount"`
	} `bson:"statistics,omitempty" json:"statistics"`
}

// Model for maping database
type ChannelBson struct {
	ID          string             `bson:"_id,omitempty"`
	ChannelID   string             `bson:"channelId,omitempty"`
	Title       string             `bson:"title,omitempty"`
	Description string             `bson:"description,omitempty"`
	PublishedAt primitive.DateTime `bson:"publishedAt,omitempty"`
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
	Country    string `bson:"country"`
	Statistics struct {
		ViewCount             int  `bson:"viewCount,omitempty"`
		SubscriberCount       int  `bson:"subscriberCount,omitempty"`
		HiddenSubscriberCount bool `bson:"hiddenSubscriberCount"`
		VideoCount            int  `bson:"videoCount,omitempty"`
	} `bson:"statistics,omitempty"`
	UpdateAt primitive.DateTime `bson:"updateAt,omitempty"`
}
