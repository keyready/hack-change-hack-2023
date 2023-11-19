package sber

import (
	"os"
	userutils "server/framework/utils/UserUtils"

	"golang.org/x/oauth2"
)

var (
	SBER_ID_Config = &oauth2.Config{
		ClientID:     os.Getenv("CLIENT_ID"),
		ClientSecret: os.Getenv("CLIENT_SECRET"),
		RedirectURL:  os.Getenv("REDIRECT_URL"),
		Scopes:       []string{"openid"},
		Endpoint: oauth2.Endpoint{
			AuthURL:  os.Getenv("AUTH_URL"),
			TokenURL: os.Getenv("TOKEN_URL"),
		},
	}
	state, err = userutils.GenerateStateParam()
)
