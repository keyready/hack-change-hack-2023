package models

import "gorm.io/gorm"

type AddressModel struct {
	gorm.Model

	ID         uint   `gorm:"primaryKey" json:"id"`
	OwnerId    string `gorm:"not null" json:"ownerId"`
	FullAdress string `gorm:"not null" json:"full_address"`
	FiasCode   string `json:"fias_code"`
	PostIndex  string `json:"post_index"`
	Country    string `json:"count"`
	District   string `json:"district"`
	City       string `json:"city"`
	Settlement string `json:"settlement"`
	Street     string `json:"street"`
	House      string `json:"houese"`
	Building   string `json:"building"`
	Bulk       string `json:"bulk"`
	Apartment  string `json:"apartment"`
}
