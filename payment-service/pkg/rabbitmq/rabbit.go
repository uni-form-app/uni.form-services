package rabbitmq

import (
	"fmt"

	"github.com/streadway/amqp"
)

type Consumer struct {
	Connection *amqp.Connection
	Channel    *amqp.Channel
}

func NewConsumer(amqpURL string) (*Consumer, error) {
	conn, err := amqp.Dial(amqpURL)
	if err != nil {
		return nil, err
	}

	ch, err := conn.Channel()
	if err != nil {
		return nil, err
	}

	return &Consumer{Connection: conn, Channel: ch}, nil
}

func (c *Consumer) ConsumeQueue(queueName string) (<-chan amqp.Delivery, error) {
	// Declara a fila (cria se não existir)
	_, err := c.Channel.QueueDeclare(
		queueName, // nome da fila
		true,      // durable
		false,     // auto-delete
		false,     // exclusive
		false,     // no-wait
		nil,       // argumentos adicionais
	)
	if err != nil {
		return nil, fmt.Errorf("erro ao declarar a fila: %w", err)
	}

	// Consome mensagens da fila
	msgs, err := c.Channel.Consume(
		queueName, // nome da fila
		"",        // nome do consumidor
		true,      // auto-acknowledge
		false,     // exclusive
		false,     // no-local
		false,     // no-wait
		nil,       // argumentos adicionais
	)
	if err != nil {
		return nil, fmt.Errorf("erro ao consumir a fila: %w", err)
	}

	return msgs, nil
}

func (c *Consumer) Close() {
	_ = c.Channel.Close()
	_ = c.Connection.Close()
}
