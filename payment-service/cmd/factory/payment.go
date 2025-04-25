package factory

import (
	"context"
	"fmt"
	"main/config"
	paymentHandler "main/internal/handler/payment"
	"main/internal/repository"
	paymentService "main/internal/service/payment"
	"main/pkg/logger"
	"main/pkg/rabbitmq"
	"main/pkg/validator"
	"sync"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Factory struct {
	config *config.Config
	logger *logger.Logger
}

func NewFactory() *Factory {
	return &Factory{
		config: &config.Env,
		logger: logger.New("Factory"),
	}
}

func (f *Factory) Run() {
	rabbit, err := rabbitmq.NewConsumer(f.config.Rabbit.URI)
	if err != nil {
		f.logger.Error("Error creating RabbitMQ consumer:", err)
		return
	}

	dbpool, err := pgxpool.New(context.Background(), config.Env.Postgres.URI)
	if err != nil {
		f.logger.Error("Error creating PostgreSQL pool:", err)
		panic(err)
	}

	msgs, err := rabbit.ConsumeQueue(f.config.Rabbit.Topics.ProcessPayment)
	if err != nil {
		f.logger.Error("Error consuming RabbitMQ queue:", err)
		return
	}
	defer dbpool.Close()
	repository := repository.NewRepository(dbpool)
	paymentService := paymentService.NewPaymentService(repository)
	validator := validator.New()

	paymentHandler := paymentHandler.NewPaymentHandler(paymentService, validator)

	var wg sync.WaitGroup

	f.logger.Info("Starting consumer...")

	for msg := range msgs {
		wg.Add(1)
		go func(message string) {
			defer wg.Done()
			paymentHandler.HandlePaymentMessage(message)
		}(string(msg.Body))
	}

	wg.Wait()
	defer rabbit.Close()
	fmt.Println("RabbitMQ consumer closed")
}
