package userpkg

import (
	"log"
	"net/http"
	usertypes "server/framework/types/UserTypes"
	userutils "server/framework/utils/UserUtils"

	"github.com/gin-gonic/gin"
)

func (h handler) LoginUser(ctx *gin.Context) {

	var candidate usertypes.LoginUser

	if err := ctx.ShouldBindJSON(&candidate); err != nil {
		log.Fatal(err)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	isUserInDb := userutils.CheckUserInDB(candidate.Email, h.DB)
	if isUserInDb {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"erorr": "user already exists",
		})
		return
	}

}
