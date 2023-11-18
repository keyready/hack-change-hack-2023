package usertypes

type RegisterUser struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type FindUserByEmail struct {
	Email string `json:"email"`
}

type LoginUser struct {
	Email    string `json:"number"`
	Password string `json:"password"`
}
