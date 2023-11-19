package userpkg

import (
	"log"
	"net/http"
	usertypes "server/framework/types/UserTypes"
	errorutils "server/framework/utils/ErrorUtils"
	userutils "server/framework/utils/UserUtils"

	"github.com/gin-gonic/gin"
)

func (h handler) LoginUser(ctx *gin.Context) {

	var candidate usertypes.LoginUser

	if err := ctx.ShouldBindJSON(&candidate); err != nil {
		log.Fatal(err)
		errorutils.Fail(ctx, http.StatusBadRequest, "invalid format body request")
		return
	}

	isUserInDb := userutils.CheckUserInDB(candidate.Email, h.DB)
	if isUserInDb {
		errorutils.Fail(ctx, http.StatusNotFound, "user already exists")
		return
	}

	user, err := userutils.GetUser(candidate.Email, h.DB)

	result, err := userutils.CheckHashPassowrd(user.Password, candidate.Password)
	if err != nil && result != true {
		log.Fatal(err)
		errorutils.Fail(ctx, http.StatusUnauthorized, "invalid password")
		return
	}

	errorutils.Success(ctx, http.StatusOK, "login success")
	return
}
