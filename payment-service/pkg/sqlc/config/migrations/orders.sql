CREATE TABLE IF NOT EXISTS public."Order" (
  id text COLLATE pg_catalog."default" NOT NULL DEFAULT gen_random_uuid(),
  "productId" text COLLATE pg_catalog."default" NOT NULL,
  "buyerId" text COLLATE pg_catalog."default" NOT NULL,
  "partnerId" text COLLATE pg_catalog."default" NOT NULL,
  status "OrderStatus" NOT NULL DEFAULT 'PENDING' :: "OrderStatus",
  "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "confirmedAt" timestamp with time zone
);

CREATE TYPE public."OrderStatus" AS ENUM (
  'PENDING',
  'PAYMENT_CONFIRMED',
  'ON_DELIVERY',
  'DELIVERED',
  'CANCELLED'
);