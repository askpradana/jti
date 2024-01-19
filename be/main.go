package main

import (
	"github.com/gin-gonic/gin"
	"jti.be/src"
)

func main() {
	r := gin.Default()

	db := src.SetupDatabase()
	defer db.Close()

	src.HandleRoute(r, db)

	port := "4321"
	r.Run(":" + port)
}
