package paymentService

import (
	"log"
)

type PaymentService struct{}

func NewPaymentService() *PaymentService {
	return &PaymentService{}
}

type PaymentPayload struct {
	OrderID string  `json:"orderId" validate:"required,uuid"`
	BuyerID string  `json:"buyerId" validate:"required,uuid"`
	Amount  float64 `json:"amount" validate:"required,gt=0"`
}

func (s *PaymentService) ProcessPayment(payload PaymentPayload) {
	log.Printf("Processing payment for Order ID: %s, Buyer ID: %s, Amount: %.2f\n", payload.OrderID, payload.BuyerID, payload.Amount)
}
