-- Table: public.PaymentHistory
CREATE TABLE IF NOT EXISTS public."PaymentHistory" (
  id text COLLATE pg_catalog."default" NOT NULL,
  "orderId" text COLLATE pg_catalog."default" NOT NULL,
  "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status "PaymentStatus" NOT NULL DEFAULT 'PENDING' :: "PaymentStatus"
);