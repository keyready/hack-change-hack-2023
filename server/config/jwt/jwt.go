package jwt

import (
	"crypto/rand"
	"errors"
	"fmt"
	"log"
	usertypes "server/framework/types/UserTypes"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey []byte

func InitJWT() {
	var randByte [32]byte

	_, err := rand.Read(randByte[:])
	if err != nil {
		log.Fatal(err)
	}

	jwtKey = randByte[:]
}

func GenerateToken(id uint, role string) (*string, error) {
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp":  time.Now().Add(time.Minute * 10).Unix(),
		"id":   strconv.FormatUint(uint64(id), 10),
		"role": role,
	})

	token, err := t.SignedString(jwtKey)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return &token, nil
}

func VerifyToken(token string) (*usertypes.UserDataResponse, error) {
	parsed, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}

		return jwtKey, nil
	})
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	claims, ok := parsed.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("jwt error")
	}

	idStr, ok := claims["ID"].(string)
	if !ok {
		return nil, errors.New("jwt error")
	}

	signedID, err := strconv.Atoi(idStr)
	if err != nil {
		return nil, err
	}

	id := uint(signedID)

	role, ok := claims["role"].(string)
	if !ok {
		return nil, errors.New("jwt error")
	}

	userData := usertypes.UserDataResponse{
		ID:   id,
		Role: role,
	}

	return &userData, nil
}
