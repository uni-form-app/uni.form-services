package rabbitmq

import (
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
	msgs, err := c.Channel.Consume(
		queueName, // nome da fila
		"",        // consumidor
		true,      // auto-acknowledge
		false,     // exclusive
		false,     // no-local
		false,     // no-wait
		nil,       // argumentos adicionais
	)
	if err != nil {
		return nil, err
	}
	return msgs, nil
}

func (c *Consumer) Close() {
	c.Channel.Close()
	c.Connection.Close()
}
