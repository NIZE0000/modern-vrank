package controllers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"vrank-api/models"
	"vrank-api/modules"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/mgo.v2/bson"
)

// var db *mongo.Database

func init() {
	// _, db, _ = modules.ConnectDB()
}

func ListChannel(c *gin.Context) {

	// Set default values for query parameters
	limit, _ := strconv.ParseInt(c.DefaultQuery("limit", "25"), 10, 64)
	offset, _ := strconv.ParseInt(c.DefaultQuery("offset", "0"), 10, 64)
	sort := c.DefaultQuery("sort", "channelId")
	order := c.DefaultQuery("order", "asc")
	name := c.Query("name")
	country := c.Query("country")

	// limit exceeded 50
	if limit >= 50 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Limit parameter exceeds maximum allowed value"})
		return
	}

	// Define criteria for Ascend and Descend
	var sortCriteria bson.M
	if order == "asc" {
		sortCriteria = bson.M{sort: 1}
	}
	if order == "dsc" {
		sortCriteria = bson.M{sort: -1}
	}

	// connect to mongo database
	_, db, err := modules.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}

	collection := db.Collection("channel")

	filter := bson.M{
		"updateAt": bson.M{
			"$exists": true,
		},
	}
	if name != "" {
		filter["title"] = bson.M{"$regex": name, "$options": "i"}
	}
	if country != "" {
		filter["country"] = bson.M{"$regex": country, "$options": "i"}
	}

	opts := options.Find().SetSort(sortCriteria).SetSkip(offset).SetLimit(limit)
	cursor, err := collection.Find(context.TODO(), filter, opts)
	if err != nil {
		fmt.Println(err)
	}
	defer cursor.Close(context.Background())

	// Loop through the cursor and append the documents to a slice
	var documents []models.Channel
	for cursor.Next(context.Background()) {
		var document models.Channel
		if err := cursor.Decode(&document); err != nil {
			// Handle error
			fmt.Println(err)
		}
		documents = append(documents, document)
	}

	c.JSON(http.StatusOK, gin.H{"results": documents})
}

func AddChannel(c *gin.Context) {

}

func GetOneChannel(c *gin.Context) {

	id := c.Params.ByName("id")

	// connect to mongo database
	_, db, err := modules.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}

	collection := db.Collection("channel")

	filter := bson.M{
		"channelId": id,
		"updateAt": bson.M{
			"$exists": true,
		},
	}

	opts := options.FindOne()
	cursor := collection.FindOne(context.TODO(), filter, opts)
	var document bson.M
	cursor.Decode(&document)

	c.JSON(http.StatusOK, gin.H{"result": document})

}

func PutOneChannel(c *gin.Context) {

}

func DeleteChannel(c *gin.Context) {

}
