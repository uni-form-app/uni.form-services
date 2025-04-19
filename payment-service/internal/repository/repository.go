package repository

import (
	"context"
	"main/pkg/sqlc/models"
)

type Repository interface {
	CreateHistory(ctx context.Context, params models.CreateHistoryParams) error
}
