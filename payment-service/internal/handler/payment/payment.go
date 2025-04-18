package payment

import paymentService "main/internal/service/payment"

type PaymentHandler struct {
	Service *paymentService.PaymentService
}

func NewPaymentHandler(service *paymentService.PaymentService) *PaymentHandler {
	return &PaymentHandler{Service: service}
}

func (h *PaymentHandler) HandlePaymentMessage(message string) {
	h.Service.ProcessPayment(message)
}
