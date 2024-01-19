package src

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Edit(c *gin.Context, db *sql.DB) {

	var editRequest FormDataEDIT
	if err := c.ShouldBindJSON(&editRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updateStatement := "UPDATE simpenan SET noPhone = $1, provider = $2 WHERE id = $3"
	_, err := db.Exec(updateStatement, editRequest.Phone, editRequest.Provider, editRequest.ID)

	if err != nil {
		fmt.Printf(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Update success"})
}
