package userutils

import (
	"crypto/rand"
	"encoding/base64"
	"log"
	"net/http"
	usertypes "server/framework/types/UserTypes"
	errorutils "server/framework/utils/ErrorUtils"
	"server/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func CheckHashPassowrd(hashPassword string, password string) (bool, error) {
	if err := bcrypt.CompareHashAndPassword([]byte(hashPassword), []byte(password)); err != nil {
		log.Fatal(err)
		return false, err
	}
	return true, nil
}

func HashPassword(password string) (string, error) {
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal(err)
		return "", err
	}
	return string(hashPassword), nil
}

func CheckUserInDB(email string, db *gorm.DB) bool {
	var FindUser usertypes.FindUserByEmail
	if result := db.Find(&FindUser, email); result.Error != nil {
		log.Fatal(result.Error)
		return false
	}
	return true
}

func GetUser(email string, db *gorm.DB) (*models.UserModel, error) {
	var user models.UserModel

	if result := db.Find(&user, email); result.Error != nil {
		log.Fatal(result.Error)
		return nil, result.Error
	}
	return &user, nil
}

func GenerateStateParam() string {
	randomBytes := make([]byte, 15)
	_, err := rand.Read(randomBytes)
	if err != nil {
		return ""
	}
	rndString := base64.URLEncoding.EncodeToString(randomBytes)
	return rndString[:]
}

func generateFileName() string {
	randomBytes := make([]byte, 10)
	_, err := rand.Read(randomBytes)
	if err != nil {
		return ""
	}
	rndString := base64.URLEncoding.EncodeToString(randomBytes)
	return rndString[:]
}

func SaveUserImg(ctx *gin.Context) {
	file, header, err := ctx.Request.FormFile("img")
	if err != nil {
		errorutils.Fail(ctx, http.StatusBadRequest, "no upload image")
		return
	}
	defer file.Close()

	filename := "../../../static/images/" + generateFileName()

	err = ctx.SaveUploadedFile(header, filename)
	if err != nil {
		log.Fatal(err)
		errorutils.Fail(ctx, http.StatusBadRequest, "no save image")
		return
	}

	errorutils.Success(ctx, http.StatusOK, "upload image success")
	return
}
