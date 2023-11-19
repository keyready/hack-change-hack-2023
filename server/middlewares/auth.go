package middlewares

import (
	"log"
	"net/http"
	"server/config/jwt"
	errorutils "server/framework/utils/ErrorUtils"
	"server/models"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Auth(ctx *gin.Context, h *gorm.DB) error {

	authHeader := ctx.Request.Header.Get("Authorization")

	if authHeader == "" {
		return errorutils.Fail(ctx, http.StatusUnauthorized, "no token provided")
	}

	chunks := strings.Split(authHeader, " ")

	if len(chunks) != 2 && chunks[0] != "Bearer" {
		return errorutils.Fail(ctx, http.StatusUnauthorized, "invalid token form")
	}

	userData, err := jwt.VerifyToken(chunks[1])
	if err != nil {
		log.Fatal(err)
		return errorutils.Fail(ctx, http.StatusUnauthorized, err.Error())
	}

	var user models.UserModel
	q := h.Find(&user, userData.ID)
	if q.Error != nil {
		log.Fatal(q.Error)
		return errorutils.Fail(ctx, http.StatusNotFound, "not user in db")
	}

	ctx.Next()
	return nil
}
