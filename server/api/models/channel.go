package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Database maping
type ChannelModel struct {
	ID          string `bson:"_id,omitempty" json:"-"`
	ChannelID   string `bson:"channelId,omitempty" json:"channelId"`
	Title       string `bson:"title,omitempty" json:"title"`
	Description string `bson:"description,omitempty" json:"description"`
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
	} `bson:"thumbnails,omitempty" json:"thumbnails"`
	Localized struct {
		Title       string `bson:"title,omitempty" `
		Description string `bson:"description,omitempty"`
		Country     string `bson:"country"`
	} `bson:"localized,omitempty"`
	Statistics struct {
		ViewCount             string `bson:"viewCount,omitempty"`
		SubscriberCount       string `bson:"subscriberCount,omitempty"`
		HiddenSubscriberCount bool   `bson:"hiddenSubscriberCount,omitempty"`
		VideoCount            string `bson:"videoCount,omitempty"`
	} `bson:"statistics,omitempty"`
	UpdateAt primitive.DateTime `bson:"updateAt,omitempty"`
}
