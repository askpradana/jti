package src

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Input(c *gin.Context, db *sql.DB) {
	var formData FormData
	if err := c.ShouldBindJSON(&formData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Printf("Phone: %s, Provider: %s\n", formData.Phone, formData.Provider)

	insertStatement := "INSERT INTO simpenan (noPhone, provider) VALUES ($1, $2)"
	_, err := db.Exec(insertStatement, formData.Phone, formData.Provider)
	if err != nil {
		fmt.Printf(err.Error())
	} else {
		fmt.Println("Row inserted successfully.")
	}

	c.JSON(http.StatusOK, gin.H{"message": "Data received successfully"})
}
