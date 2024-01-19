package main

import (
	"math/rand"

	_ "github.com/lib/pq"

	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FormData struct {
	Phone    string `json:"noPhone"`
	Provider string `json:"provider"`
}

type FormDataDelete struct {
	ID string `json:"id"`
}

type FormDataGET struct {
	ID       string `json:"id"`
	Phone    string `json:"noPhone"`
	Provider string `json:"provider"`
}

type FormDataEDIT struct {
	ID       string `json:"id"`
	Phone    string `json:"noPhone"`
	Provider string `json:"provider"`
}

func generateRandomData() FormData {
	randomPhone := fmt.Sprintf("08%d", rand.Intn(1000000000))[:10]

	providers := []string{"four", "indobro", "jemaah", "auto generate"}
	randomProvider := providers[rand.Intn(len(providers))]

	return FormData{
		Phone:    randomPhone,
		Provider: randomProvider,
	}
}

func main() {
	r := gin.Default()

	db, err := sql.Open("postgres", "user=postgres dbname=postgres sslmode=disable host=127.0.0.1 port=4000")
	if err != nil {
		fmt.Printf(err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		fmt.Printf(err.Error())

	}

	r.POST("/input", func(c *gin.Context) {
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
	})

	r.GET("/output", func(c *gin.Context) {
		rows, err := db.Query("SELECT * FROM simpenan")
		if err != nil {
			fmt.Printf(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
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
	})

	r.POST("/delete", func(c *gin.Context) {
		var deleteRequest FormDataDelete
		if err := c.ShouldBindJSON(&deleteRequest); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		deleteStatement := "DELETE FROM simpenan WHERE id = $1"
		_, err = db.Exec(deleteStatement, deleteRequest.ID)

		if err != nil {
			fmt.Printf(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Delete success"})

	})

	r.POST("/edit", func(c *gin.Context) {
		var editRequest FormDataEDIT
		if err := c.ShouldBindJSON(&editRequest); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		updateStatement := "UPDATE simpenan SET noPhone = $1, provider = $2 WHERE id = $3"
		_, err = db.Exec(updateStatement, editRequest.Phone, editRequest.Provider, editRequest.ID)
		if err != nil {
			fmt.Printf(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Update success"})
	})

	r.POST("/auto", func(c *gin.Context) {
		for i := 0; i < 25; i++ {
			randomData := generateRandomData()

			insertStatement := "INSERT INTO simpenan (noPhone, provider) VALUES ($1, $2)"
			_, err := db.Exec(insertStatement, randomData.Phone, randomData.Provider)
			if err != nil {
				fmt.Printf(err.Error())
			}
			// else {
			// 	fmt.Println("Row inserted successfully:", randomData)
			// }
		}

		c.JSON(http.StatusOK, gin.H{"message": "Auto-generate and insert success"})
	})

	port := "4321"
	r.Run(":" + port)
}
