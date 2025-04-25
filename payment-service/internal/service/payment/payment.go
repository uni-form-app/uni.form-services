package paymentService

import (
	"context"
	"main/internal/repository"
	"main/pkg/logger"
	"main/pkg/sqlc/models"
	"time"
)

type PaymentService struct {
	repository repository.Repository
	logger     *logger.Logger
}

func NewPaymentService(
	repo repository.Repository,
) *PaymentService {
	return &PaymentService{
		repository: repo,
		logger:     logger.New("Payment Service"),
	}
}

type PaymentPayload struct {
	OrderID string `json:"orderId" validate:"required,uuid"`
}

func (s *PaymentService) ProcessPayment(payload PaymentPayload) error {
	s.logger.Info("Processing payment for order ID: " + payload.OrderID)
	timeToProcess := 15 // seconds

	time.Sleep(time.Duration(timeToProcess) * time.Second)
	s.logger.Info("Payment processed for order ID: " + payload.OrderID)

	ctx := context.Background()

	tx, err := s.repository.WithTx(ctx)
	if err != nil {
		return err
	}

	now := time.Now()

	if err := tx.UpdateOrder(ctx, models.UpdateOrderParams{
		ID:          payload.OrderID,
		Status:      "PAYMENT_CONFIRMED",
		ConfirmedAt: &now,
	}); err != nil {
		_ = tx.Rollback(ctx)
		return err
	}

	if err := tx.CreateHistory(ctx, models.CreateHistoryParams{
		OrderId: payload.OrderID,
		Status:  "COMPLETED",
	}); err != nil {
		_ = tx.Rollback(ctx)
		return err
	}

	if err := tx.Commit(ctx); err != nil {
		_ = tx.Rollback(ctx)
		return err
	}

	s.logger.Info("Payment processed successfully for order ID: " + payload.OrderID)
	return nil
}
