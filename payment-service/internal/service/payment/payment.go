package paymentService

import (
	"context"
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
	timeToProcess := 15 // seconds

	time.Sleep(time.Duration(timeToProcess) * time.Second)

	s.repository.CreateHistory(context.Background(), models.CreateHistoryParams{
		OrderId: payload.OrderID,
		Status:  "COMPLETED",
	})
}
