package paymentService

import (
	"context"
	"fmt"
	"main/internal/repository"
	"main/pkg/sqlc/models"
	"time"
)

type PaymentService struct {
	repository repository.Repository
}

func NewPaymentService(
	repo repository.Repository,
) *PaymentService {
	return &PaymentService{
		repository: repo,
	}
}

type PaymentPayload struct {
	OrderID string `json:"orderId" validate:"required,uuid"`
}

func (s *PaymentService) ProcessPayment(payload PaymentPayload) {
	fmt.Printf("Processing payment for order ID: %s\n", payload.OrderID)
	timeToProcess := 15 // seconds

	time.Sleep(time.Duration(timeToProcess) * time.Second)
	fmt.Printf("Payment processed for order ID: %s\n", payload.OrderID)

	err := s.repository.CreateHistory(context.Background(), models.CreateHistoryParams{
		OrderId: payload.OrderID,
		Status:  "COMPLETED",
	})

	if err != nil {
		fmt.Printf("Error creating history: %v\n", err)
		return
	}

	err = s.repository.UpdateOrder(context.Background(), models.UpdateOrderParams{
		ID:     payload.OrderID,
		Status: "PAYMENT_CONFIRMED",
	})

	if err != nil {
		fmt.Printf("Error updating order: %v\n", err)
		return
	}
}
