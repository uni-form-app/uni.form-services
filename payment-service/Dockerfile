# Etapa de build
FROM golang:1.24.1 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos go.mod e go.sum
COPY go.mod go.sum ./

# Baixa as dependências
RUN go mod download

# Copia o restante do código-fonte
COPY . .

# Compila o binário
RUN go build -o main ./cmd/main.go

# Etapa final (runtime)
FROM debian:bullseye-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia o binário da etapa de build
COPY --from=builder /app/main ./

# Comando para rodar a aplicação
CMD ["./main", "-production"]
