package payment

import (
	"encoding/json"
	"fmt"
	paymentService "main/internal/service/payment"
	"main/pkg/validator"
)

type PaymentHandler struct {
	Service   *paymentService.PaymentService
	Validator *validator.Validator
}

func NewPaymentHandler(
	service *paymentService.PaymentService,
	validator *validator.Validator,
) *PaymentHandler {
	return &PaymentHandler{
		Service:   service,
		Validator: validator,
	}
}

func (h *PaymentHandler) validateMessage(payload string) (payment *paymentService.PaymentPayload, err error) {
	var paymentDTO paymentService.PaymentPayload
	err = json.Unmarshal([]byte(payload), &paymentDTO)

	if err != nil {
		return nil, err
	}

	return &paymentDTO, nil
}

func (h *PaymentHandler) HandlePaymentMessage(message string) {
	fmt.Printf("Mensagem recebida: %s\n", message)
	paymentMessage, err := h.validateMessage(message)
	if err != nil {
		fmt.Printf("Erro ao decodificar a mensagem: %v", err)
		return
	}

	err = h.Validator.Validate(paymentMessage)
	if err != nil {
		fmt.Printf("Erro ao validar a mensagem: %v", err)
		return
	}

	h.Service.ProcessPayment(*paymentMessage)
}
