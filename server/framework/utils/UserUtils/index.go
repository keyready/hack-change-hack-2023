package userutils

import (
	"crypto/rand"
	"encoding/base64"
	"log"
	usertypes "server/framework/types/UserTypes"
	"server/models"

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
