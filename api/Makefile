IMAGE_NAME=jonasssneto/uniform-api
VERSION?=latest

build:
	docker build -t $(IMAGE_NAME):$(VERSION) .
	docker push $(IMAGE_NAME):$(VERSION)
