package models

type Stats struct {
	ID         string
	Statistics struct {
		ViewCount       string
		SubscriberCount string
		VideoCount      string
	}
}
