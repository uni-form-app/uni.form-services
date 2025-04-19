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

func (s *PaymentService) ProcessPayment(payload PaymentPayload) error {
	fmt.Printf("Processing payment for order ID: %s\n", payload.OrderID)
	timeToProcess := 15 // seconds

	time.Sleep(time.Duration(timeToProcess) * time.Second)
	fmt.Printf("Payment processed for order ID: %s\n", payload.OrderID)

	ctx := context.Background()

	tx, err := s.repository.WithTx(ctx)
	if err != nil {
		return err
	}

	if err := tx.UpdateOrder(ctx, models.UpdateOrderParams{
		ID:     payload.OrderID,
		Status: "PAYMENT_CONFIRMED",
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
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	fmt.Printf("Payment processed for order ID: %s\n", payload.OrderID)
	return nil
}
