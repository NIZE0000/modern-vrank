package main

import (
	"vrank-api/routes"
)

func init() {

}

func main() {
	r := routes.SetupRoutes()
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
