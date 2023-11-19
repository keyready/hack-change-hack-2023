package userpkg

import (
	"log"
	"net/http"
	usertypes "server/framework/types/UserTypes"
	errorutils "server/framework/utils/ErrorUtils"
	userutils "server/framework/utils/UserUtils"
	"server/models"

	"github.com/gin-gonic/gin"
)

func (h handler) RegisterUser(ctx *gin.Context) {

	var newUser usertypes.RegisterUser

	if err := ctx.ShouldBindJSON(&newUser); err != nil {
		log.Fatal(err)
		errorutils.Fail(ctx, http.StatusBadRequest, "invalid format body request")
		return
	}

	isUserInDb := userutils.CheckUserInDB(newUser.Email, h.DB)
	if !isUserInDb {
		errorutils.Fail(ctx, http.StatusBadRequest, "user already exists")
		return
	}

	hashedPassword, err := userutils.HashPassword(newUser.Password)
	if err != nil {
		log.Fatal(err)
		errorutils.Fail(ctx, http.StatusBadRequest, "error password format")
		return
	}

	if result := h.DB.Create(&models.UserModel{
		Email:    newUser.Email,
		Password: hashedPassword,
	}); result.Error != nil {
		log.Fatal(result.Error)
		errorutils.Fail(ctx, http.StatusBadRequest, "error created user db")
		return
	}

	errorutils.Success(ctx, http.StatusCreated, "user created")
	return
}
