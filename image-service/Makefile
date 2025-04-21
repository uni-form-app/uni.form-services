IMAGE_NAME=jonasssneto/image-service
VERSION?=latest

build:
	docker build -t $(IMAGE_NAME):$(VERSION) .
	docker push $(IMAGE_NAME):$(VERSION)
