package src

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Delete(c *gin.Context, db *sql.DB) {
	var deleteRequest FormDataDelete
	if err := c.ShouldBindJSON(&deleteRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	deleteStatement := "DELETE FROM simpenan WHERE id = $1"
	_, err := db.Exec(deleteStatement, deleteRequest.ID)

	if err != nil {
		fmt.Printf(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Delete success"})
}
