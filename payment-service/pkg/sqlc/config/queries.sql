-- queries.sql
-- name: CreateHistory :exec
INSERT INTO
  public."PaymentHistory"("orderId", "status")
VALUES
  ($1, $2);

-- name: UpdateOrder :exec
UPDATE
  public."Order"
SET
  status = $1
WHERE
  id = $2;