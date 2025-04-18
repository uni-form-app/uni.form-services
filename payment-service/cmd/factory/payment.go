package factory

import (
	"fmt"
	"main/config"
	paymentHandler "main/internal/handler/payment"
	paymentService "main/internal/service/payment"
	"main/pkg/rabbitmq"
	"main/pkg/validator"
	"sync"
)

type Factory struct {
	config *config.Config
}

func NewFactory() *Factory {
	return &Factory{
		config: &config.Env,
	}
}

func (f *Factory) Run() {
	rabbit, err := rabbitmq.NewConsumer(f.config.Rabbit.URI)
	if err != nil {
		fmt.Println("Error creating RabbitMQ consumer:", err)
		return
	}

	msgs, err := rabbit.ConsumeQueue(f.config.Rabbit.Topics.ProcessPayment)
	if err != nil {
		fmt.Println("Error consuming RabbitMQ queue:", err)
		return
	}

	paymentService := paymentService.NewPaymentService()
	validator := validator.New()

	paymentHandler := paymentHandler.NewPaymentHandler(paymentService, validator)

	var wg sync.WaitGroup

	for msg := range msgs {
		wg.Add(1)
		go func(message string) {
			defer wg.Done()
			fmt.Printf("Processing message: %s\n", message)
			paymentHandler.HandlePaymentMessage(message)
		}(string(msg.Body))
	}

	wg.Wait()
	defer rabbit.Close()
	fmt.Println("RabbitMQ consumer closed")
}
