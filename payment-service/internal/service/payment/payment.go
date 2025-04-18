package paymentService

import "log"

type PaymentService struct{}

func NewPaymentService() *PaymentService {
	return &PaymentService{}
}

func (s *PaymentService) ProcessPayment(message string) {
	// Lógica para processar o pagamento
	log.Printf("Processando pagamento com a mensagem: %s", message)
}
