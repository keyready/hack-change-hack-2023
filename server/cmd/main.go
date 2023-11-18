package main

import (
	"os"
	"server/config/db"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	r := gin.Default()
	godotenv.Load(".env")

	db.Connect_db(os.Getenv("DB_URI"))

	r.Static("/static", "../static")

	r.Run(":" + os.Getenv("PORT"))
}
