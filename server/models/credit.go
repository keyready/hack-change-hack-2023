package models

import (
	"gorm.io/gorm"
)

type CreditModel struct {
	gorm.Model

	ID        uint   `gorm:"primaryKey" json:"id"`
	UserId    int    `gorm:"not null" json:"userId"`
	Status    string `gorm:"not null;default:'Created'" json:"status"` //Created Processed Moderation Approved/Rejected
	Purpose   string `json:"purpose"`                                  //цель кредита
	Document  string `json:"document"`                                 //основные моменты в документах
	Agreement bool   `gorm:"default:false" json:"agreement"`
}
