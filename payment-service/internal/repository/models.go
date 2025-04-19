package repository

import (
	"context"
	"main/pkg/sqlc/models"
)

type Tx interface {
	CreateHistory(ctx context.Context, params models.CreateHistoryParams) error
	UpdateOrder(ctx context.Context, params models.UpdateOrderParams) error
	Rollback(ctx context.Context) error
	Commit(ctx context.Context) error
}

type Repository interface {
	CreateHistory(ctx context.Context, params models.CreateHistoryParams) error
	UpdateOrder(ctx context.Context, params models.UpdateOrderParams) error
	WithTx(ctx context.Context) (Tx, error)
}
