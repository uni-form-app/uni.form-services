include .env
export DB_URI := $(DATABASE_URL)
IMAGE_NAME=jonasssneto/payment-service
VERSION?=latest

gen:
	sqlc generate

build:
	docker build -t $(IMAGE_NAME):$(VERSION) .
	docker push $(IMAGE_NAME):$(VERSION)
