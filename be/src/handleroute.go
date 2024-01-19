package src

import (
	"database/sql"

	"github.com/gin-gonic/gin"
)

func HandleRoute(r *gin.Engine, db *sql.DB) {
	r.POST("/auto", func(ctx *gin.Context) {
		Auto(ctx, db)
	})
	r.POST("/input", func(ctx *gin.Context) {
		Input(ctx, db)
	})
	r.GET("/output", func(ctx *gin.Context) {
		Output(ctx, db)
	})
	r.POST("/edit", func(ctx *gin.Context) {
		Edit(ctx, db)
	})
	r.POST("/delete", func(ctx *gin.Context) {
		Delete(ctx, db)
	})
}
