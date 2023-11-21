package sberpkg

import (
	"net/http"
	"os"
	"server/config/sber"

	"github.com/gin-gonic/gin"
)

func (h handler) Redirect(ctx *gin.Context) {
	url := sber.SberIdConfig.AuthCodeURL(os.Getenv("STATE"))
	ctx.Redirect(http.StatusTemporaryRedirect, url)
}
