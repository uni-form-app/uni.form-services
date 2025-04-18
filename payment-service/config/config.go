package config

import (
	"flag"
	"log"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
)

type Config struct {
	Postgres struct {
		URI string `envconfig:"DATABASE_URL" default:"postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable"`
	}
	Rabbit struct {
		URI    string `envconfig:"RABBIT_URI" default:"amqp://guest:guest@localhost:5672/"`
		Topics struct {
			ProcessPayment string `envconfig:"RABBIT_PROCESS_PAYMENT_TOPIC" default:"payment.process"`
		}
	}

	Development bool
}

var Env Config

func Load() error {
	production := flag.Bool("production", false, "Run in production mode")
	flag.Parse()

	if !(*production) {
		log.Println("Development mode")

		if err := godotenv.Load(".env"); err != nil {
			return err
		}

		log.Println("Loaded .env file")
	}

	if err := envconfig.Process("", &Env); err != nil {
		log.Fatal("LoadConfig - Erro ao processar variáveis de ambiente", err)
		return err
	}

	Env.Development = !(*production)

	if Env.Development {
		log.Printf("Configurações: %+v \n", Env)
	}

	return nil
}
