package controllers

import (
	"github.com/gin-gonic/gin"
)

// var db *mongo.Database

func init() {
	// _, db, _ = modules.ConnectDB()
}

func ListChannel(c *gin.Context) {
	// doc := db.Collection("channels")

	// Set default values for query parameters
	limit := c.DefaultQuery("limit", "25")
	offset := c.DefaultQuery("offset", "0")
	sort := c.DefaultQuery("sort", "id")
	order := c.DefaultQuery("order", "asc")
	name := c.Query("name")

	c.JSON(200, gin.H{"limit": limit,
		"offset": offset,
		"sort":   sort,
		"order":  order,
		"name":   name})
}

func AddChannel(c *gin.Context) {

}

func GetOneChannel(c *gin.Context) {

	id := c.Param("id")

}

func PutOneChannel(c *gin.Context) {

}

func DeleteChannel(c *gin.Context) {

}
