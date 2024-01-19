package src

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Output(c *gin.Context, db *sql.DB) {
	rows, err := db.Query("SELECT * FROM simpenan")
	if err != nil {
		fmt.Printf(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad Request"})
		return
	}
	defer rows.Close()

	var formData []FormDataGET

	for rows.Next() {
		var formDataTemp FormDataGET
		err := rows.Scan(&formDataTemp.ID, &formDataTemp.Phone, &formDataTemp.Provider)
		if err != nil {
			fmt.Printf(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}
		formData = append(formData, formDataTemp)
	}

	if err := rows.Err(); err != nil {
		fmt.Printf(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	c.JSON(http.StatusOK, formData)
}
