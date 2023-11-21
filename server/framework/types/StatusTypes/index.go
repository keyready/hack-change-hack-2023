package statustypes

type Status struct {
	Code    int         `json:"code"`
	Status  string      `json:"string"`
	Message interface{} `json:"message"`
}
