package userpkg

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type handler struct {
	DB *gorm.DB
}

func UserRoutes(router *gin.Engine, db *gorm.DB) {
	h := &handler{
		DB: db,
	}

	api := router.Group("/api")

	api.POST("/register", h.RegisterUser)
	api.POST("/login", h.LoginUser)
}
