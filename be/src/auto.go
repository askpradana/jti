package src

import (
	"database/sql"
	"fmt"
	"math/rand"
	"net/http"

	"github.com/gin-gonic/gin"
)

func generateRandomData() FormData {
	randomPhone := fmt.Sprintf("08%d", rand.Intn(1000000000))[:10]

	providers := []string{"four", "indobro", "jemaah", "auto generate"}
	randomProvider := providers[rand.Intn(len(providers))]

	return FormData{
		Phone:    randomPhone,
		Provider: randomProvider,
	}
}

func Auto(c *gin.Context, db *sql.DB) {
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
}
