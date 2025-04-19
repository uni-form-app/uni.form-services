package paymentService

import (
	"log"
)

type PaymentService struct{}

func NewPaymentService() *PaymentService {
	return &PaymentService{}
}

type PaymentPayload struct {
	OrderID string `json:"orderId" validate:"required,uuid"`
}

func (s *PaymentService) ProcessPayment(payload PaymentPayload) {
	log.Printf("Processing payment for Order ID: %s", payload.OrderID)
}
