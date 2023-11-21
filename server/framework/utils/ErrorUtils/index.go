package errorutils

import (
	"net/http"
	statustypes "server/framework/types/StatusTypes"

	"github.com/gin-gonic/gin"
)

func Fail(ctx *gin.Context, code int, message interface{}) error {
	return ctx.Status(code).JSON(&statustypes.Status{
		Code:    code,
		Status:  "fail",
		Message: message,
	})
}

func Success(ctx *gin.Context, code int, message interface{}) error {
	return ctx.Status(code).JSON(&statustypes.Status{
		Code:    code,
		Status:  "success",
		Message: message,
	})
}

func InternalServerError(ctx *gin.Context, err error) error {
	return Fail(ctx, http.StatusInternalServerError, err.Error())
}
