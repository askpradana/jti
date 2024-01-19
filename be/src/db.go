package src

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

func SetupDatabase() *sql.DB {
	db, err := sql.Open("postgres", "user=postgres dbname=postgres sslmode=disable host=127.0.0.1 port=4000")
	if err != nil {
		fmt.Printf(err.Error())
	}

	err = db.Ping()
	if err != nil {
		fmt.Printf(err.Error())
	}

	return db
}
