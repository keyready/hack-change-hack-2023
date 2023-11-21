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

type UserDataResponse struct {
	ID   uint   `json:"id"`
	Role string `json:"string"`
}

type ResponseToken struct {
	Jwt string `json:"jwt"`
}

type AddDocument struct {
	Series         string `json:"series"`
	Number         string `json:"number"`
	IssuedBy       string `json:"issued_by"`
	IssuedDate     string `json:"issued_date"`
	Code           string `json:"code"`
	PlannedEndDate string `json:"planned_end_date"`
	Img            string `json:"img"`
}
