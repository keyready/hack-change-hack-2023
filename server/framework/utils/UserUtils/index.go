package userutils

import (
	"log"
	usertypes "server/framework/types/UserTypes"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func CheckHashPassowrd(hashPassword string) (string, error) {
	if err := bcrypt.CompareHashAndPassword(); err != nil {
		log.Fatal(err)
		return "", err
	}
	return "ok", nil
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
