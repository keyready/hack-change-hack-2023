package models

import "gorm.io/gorm"

type DoumentModel struct {
	gorm.Model

	Series         string `json:"series"`
	Number         string `json:"number"`
	IssuedBy       string `json:"issued_by"`
	IssuedDate     string `json:"issued_date"`
	Code           string `json:"code"`
	PlannedEndDate string `json:"planned_end_date"`
}
