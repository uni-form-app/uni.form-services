-- queries.sql
-- name: CreateHistory :exec
INSERT INTO
  public."PaymentHistory"("orderId", "status")
VALUES
  ($1, $2);