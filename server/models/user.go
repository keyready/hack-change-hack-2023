package models

import (
	"time"

	"gorm.io/gorm"
)

/*
	"sub": "2db933f8184f1f525a338b04e7ac1218a432f",
  "identification": {
    "series": "9999",
    "number": "112233",
    "issued_by": "Кем выдан",
    "issued_date": "2001-01-01",
    "code": "000-000"
  },
  "priority_doc": {
    "series": "9999",
    "number": "112233",
    "issued_by": "Кем выдан",
    "issued_date": "2001-01-01",
    "code": "000-000",
    "type": 1
  },
  "international_passport": {
    "series": "Z9999",
    "number": "999999",
    "issued_by": "Кем выдан",
    "issued_date": "2001-01-01",
    "planned_end_date": "2001-01-01"
  },
  "sts": {
    "number": "12345678"
  }
  "is_company_employee": false,
  "citizenship": {
    "country_code": "Код страны",
    "country_name": "Наименование страны"
  },
  "place_of_birth": "Место рождения",
  "address": {
    "full_address": "Полный адрес",
    "fias_code": "Идентификационный код объекта по ФИАС",
    "post_index": "Почтовый индекс",
    "country": "Страна",
    "region": "Регион",
    "district": "Район",
    "city": "Город",
    "settlement": "Населенный пункт",
    "street": "Название улицы",
    "house": "Дом",
    "building": "Строение",
    "bulk": "Корпус",
    "apartment": "Квартира"
  },
  "address_of_actual_residence": {
    "full_address": "Полный адрес",
    "fias_code": "Идентификационный код объекта по ФИАС",
    "post_index": "Почтовый индекс",
    "country": "Страна",
    "region": "Регион",
    "district": "Район",
    "city": "Город",
    "settlement": "Населенный пункт",
    "street": "Название улицы",
    "house": "Дом",
    "building": "Строение",
    "bulk": "Корпус",
    "apartment": "Квартира"
  },
  "address_reg": {
    "full_address": "Полный адрес",
    "fias_code": "Идентификационный код объекта по ФИАС",
    "post_index": "Почтовый индекс",
    "country": "Страна",
    "region": "Регион",
    "district": "Район",
    "city": "Город",
    "settlement": "Населенный пункт",
    "street": "Название улицы",
    "house": "Дом",
    "building": "Строение",
    "bulk": "Корпус",
    "apartment": "Квартира"
  },

*/

type UserModel struct {
	gorm.Model

	ID             uint      `gorm:"primaryKey" json:"id"`
	Firstname      string    `json:"given_name"`
	Middlename     string    `json:"middle_name"`
	Lastname       string    `json:"family_name"`
	Email          string    `gorm:"unique;not null" json:"email"`
	Password       string    `gorm:"not null" json:"password"`
	PhoneNumber    string    `gorm:"unique" json:"phone_number"`
	Genger         string    `gorm:"not null" json:"gender"`
	Birthdate      time.Time `json:"birthdate"` //"01.01.2001"
	Inn            string    `gorm:"unique" json:"inn"`
	Snils          string    `gorm:"unique" json:"snils"`
	DrivingLicense string    `gorm:"unique" json:"driving_license"`

	Role string `gorm:"default:'user'" json:"role"`
}
