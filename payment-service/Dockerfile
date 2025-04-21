# Etapa de build
FROM golang:1.24.1 AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .

# Compila um binário estático (sem dependência de GLIBC)
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main ./cmd/main.go

# Etapa final
FROM debian:bullseye-slim
WORKDIR /app
COPY --from=builder /app/main ./
CMD ["./main", "-production"]
