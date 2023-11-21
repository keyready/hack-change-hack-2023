package sberpkg

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
	"server/config/sber"
	errorutils "server/framework/utils/ErrorUtils"

	"github.com/gin-gonic/gin"
)

func (h handler) Callback(ctx *gin.Context) {
	recState := ctx.Query("state")
	state := os.Getenv("STATE")
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
}
