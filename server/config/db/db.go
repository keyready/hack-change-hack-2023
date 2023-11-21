package db

import (
	"log"
	"server/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect_db(uri string) *gorm.DB {

	db, err := gorm.Open(postgres.Open(uri), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
		panic(err)
	}

	db.AutoMigrate(
		&models.UserModel{},
		&models.CreditModel{},
	)

	return db
}
