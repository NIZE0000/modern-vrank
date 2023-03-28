package routes

import (
	"vrank-api/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	r := gin.Default()

	v1 := r.Group("/api/v1")
	{
		// channel routes
		v1.GET("channel", controllers.ListChannel)
		v1.POST("channel", controllers.AddChannel)
		v1.GET("channel/:id", controllers.GetOneChannel)
		v1.PUT("channel/:id", controllers.PutOneChannel)
		v1.DELETE("channel/:id", controllers.DeleteChannel)

	}

	return r
}
