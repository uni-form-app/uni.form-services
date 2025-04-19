package paymentService

import (
	"log"
	"main/internal/repository"
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
	log.Printf("Processing payment for Order ID: %s", payload.OrderID)
}
