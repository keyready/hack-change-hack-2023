package models

import (
	"time"

	"gorm.io/gorm"
)

type UserModel struct {
	gorm.Model

	ID          uint      `gorm:"primaryKey" json:"id"`
	Firstname   string    `json:"firstname"`
	Middlename  string    `json:"middlename"`
	Lastname    string    `json:"lastname"`
	Email       string    `gorm:"unique;not null" json:"email"`
	Password    string    `gorm:"not null" json:"password"`
	PhoneNumber string    `gorm:"unique" json:"phoneNumber"`
	Birthday    time.Time `json:"birthday"`
	Сitizenship string    `json:"citizenship"` //гражданство
	Age         int       `json:"age"`
	Address     string    `json:"address"`
	IsEmployed  bool      `gorm:"default:true" json:"isEmployed"`
	Job         string    `json:"job"`
	Experience  int       `json:"experience"`
	Income      int       `json:"income"`

	Role string `gorm:"default:'user'" json:"role"`
}
