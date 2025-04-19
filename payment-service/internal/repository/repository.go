package repository

import (
	"context"
	"main/pkg/sqlc/models"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type postgresRepository struct {
	db *pgxpool.Pool
	q  *models.Queries
}

func NewRepository(db *pgxpool.Pool) Repository {
	return &postgresRepository{
		db: db,
		q:  models.New(db),
	}
}

func (r *postgresRepository) CreateHistory(ctx context.Context, params models.CreateHistoryParams) error {
	return r.q.CreateHistory(ctx, params)
}

func (r *postgresRepository) UpdateOrder(ctx context.Context, params models.UpdateOrderParams) error {
	return r.q.UpdateOrder(ctx, params)
}

func (r *postgresRepository) WithTx(ctx context.Context) (Tx, error) {
	tx, err := r.db.BeginTx(ctx, pgx.TxOptions{}) // usa pgx.TxOptions corretamente
	if err != nil {
		return nil, err
	}
	return &txRepository{
		tx: tx,
		q:  models.New(tx),
	}, nil
}

type txRepository struct {
	tx pgx.Tx
	q  *models.Queries
}

func (t *txRepository) CreateHistory(ctx context.Context, params models.CreateHistoryParams) error {
	return t.q.CreateHistory(ctx, params)
}

func (t *txRepository) UpdateOrder(ctx context.Context, params models.UpdateOrderParams) error {
	return t.q.UpdateOrder(ctx, params)
}

func (t *txRepository) Rollback(ctx context.Context) error {
	return t.tx.Rollback(ctx)
}

func (t *txRepository) Commit(ctx context.Context) error {
	return t.tx.Commit(ctx)
}
