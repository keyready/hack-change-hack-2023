package sberpkg

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type handler struct {
	DB *gorm.DB
}

func SberRoutes(router *gin.Engine, db *gorm.DB) {
	h := &handler{
		DB: db,
	}
	SberApi := router.Group("/sberApi")

	SberApi.GET("/", h.Redirect)
	SberApi.GET("/callback", h.Callback)
}
