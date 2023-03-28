package models

import (
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
