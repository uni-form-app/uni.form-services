package payment

import (
	"encoding/json"
	paymentService "main/internal/service/payment"
	"main/pkg/logger"
	"main/pkg/validator"
)

type PaymentHandler struct {
	Service   *paymentService.PaymentService
	Validator *validator.Validator
	logger    *logger.Logger
}

func NewPaymentHandler(
	service *paymentService.PaymentService,
	validator *validator.Validator,
) *PaymentHandler {
	return &PaymentHandler{
		Service:   service,
		Validator: validator,
		logger:    logger.New("Payment Handler"),
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
	h.logger.Info("Iniciando o processamento da mensagem de pagamento")
	paymentMessage, err := h.validateMessage(message)
	if err != nil {
		h.logger.Error("Erro ao validar a mensagem:", err)
		return
	}

	err = h.Validator.Validate(paymentMessage)
	if err != nil {
		h.logger.Error("Erro ao validar o pagamento:", err)
		return
	}

	err = h.Service.ProcessPayment(*paymentMessage)
	if err != nil {
		h.logger.Error("Erro ao processar pagamento:", err)
		return
	}
}
