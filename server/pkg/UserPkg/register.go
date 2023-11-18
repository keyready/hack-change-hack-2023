package userpkg

import (
	"log"
	"net/http"
	usertypes "server/framework/types/UserTypes"
	userutils "server/framework/utils/UserUtils"
	"server/models"

	"github.com/gin-gonic/gin"
)

func (h handler) RegisterUser(ctx *gin.Context) {

	var newUser usertypes.RegisterUser

	if err := ctx.ShouldBindJSON(&newUser); err != nil {
		log.Fatal(err)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	isUserInDb := userutils.CheckUserInDB(newUser.Email, h.DB)
	if !isUserInDb {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "user already exists"})
		return
	}

	hashedPassword, err := userutils.HashPassword(newUser.Password)
	if err != nil {
		log.Fatal(err)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if result := h.DB.Create(&models.UserModel{
		Email:    newUser.Email,
		Password: hashedPassword,
	}); result.Error != nil {
		ctx.AbortWithStatusJSON(
			http.StatusBadRequest,
			gin.H{"error": result.Error})
	}

	ctx.JSON(
		http.StatusCreated,
		gin.H{
			"message": "new user created",
		},
	)
	return
}
