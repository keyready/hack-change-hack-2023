package main

import (
	"fmt"
	"os"
	"server/config/db"
	"server/config/jwt"
	sberauth "server/pkg/SberPkg"
	userpkg "server/pkg/UserPkg"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	r := gin.Default()

	godotenv.Load(".env")
	dbHandler := db.Connect_db(os.Getenv("DB_URI"))
	jwt.InitJWT()
	r.Static("/static", "../static")

	userpkg.UserRoutes(r, dbHandler)
	sberauth.SberRoutes(r, dbHandler)

	fmt.Println("Server started http://localhost:%p", os.Getenv("PORT"))
	r.Run(":" + os.Getenv("PORT"))
}
