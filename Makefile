# Define valores padrão para as variáveis
VERSION ?= latest  # Usa "latest" como versão padrão caso não seja passado um argumento

# Define os nomes das imagens
BACK_IMAGE := jonasssneto/ilab-node
FRONT_IMAGE := jonasssneto/ilab-react

# Diretórios
BACK_DIR := ./server

# Regra para o build e push do backend
.PHONY: build-back build-front build-all push-all
build-back:
	docker build -t $(BACK_IMAGE):$(VERSION) $(BACK_DIR)
	docker push $(BACK_IMAGE):$(VERSION)
	@echo "\033[32m✔ Backend build concluído e imagem $(BACK_IMAGE):$(VERSION)!\033[0m"

# Regra para o build e push do frontend
build-front:
	docker build -t $(FRONT_IMAGE):$(VERSION) $(FRONT_DIR)
	docker push $(FRONT_IMAGE):$(VERSION)
	@echo "\033[32m✔ Frontend build concluído e imagem $(FRONT_IMAGE):$(VERSION)!\033[0m"

# Regras para build e push de todas as imagens
build: build-back build-front
