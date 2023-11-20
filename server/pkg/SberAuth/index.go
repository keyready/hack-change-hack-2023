package sberauth

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
	"server/config/sber"
	errorutils "server/framework/utils/ErrorUtils"
	userutils "server/framework/utils/UserUtils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var state string = userutils.GenerateStateParam()

func Oauth2Routes(router *gin.Engine, h *gorm.DB) {

	SberApi := router.Group("/sberApi")

	SberApi.GET("/", func(ctx *gin.Context) {
		url := sber.SberIdConfig.AuthCodeURL(state)
		ctx.Redirect(http.StatusTemporaryRedirect, url)
	})

	SberApi.GET("/callback", func(ctx *gin.Context) {
		recState := ctx.Query("state")
		if recState != state {
			errorutils.Fail(ctx, http.StatusUnauthorized, "invalid state value")
			return
		}

		code := ctx.Query("code")
		token, err := sber.SberIdConfig.Exchange(context.Background(), code)
		if err != nil {
			errorutils.InternalServerError(ctx, err)
			return
		}

		client := sber.SberIdConfig.Client(context.Background(), token)
		resp, err := client.Get(os.Getenv("USERINFO_URL"))
		if err != nil {
			errorutils.InternalServerError(ctx, err)
			return
		}

		defer resp.Body.Close()
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			errorutils.InternalServerError(ctx, err)
			return
		}

		var userInfo map[string]interface{}
		err = json.Unmarshal(body, &userInfo)
		if err != nil {
			errorutils.Fail(ctx, http.StatusBadRequest, "invalid convert to json")
			return
		}

		ctx.JSON(http.StatusCreated, userInfo)
	})
}
