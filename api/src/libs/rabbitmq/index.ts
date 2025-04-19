import * as client from 'amqplib';
import { Channel, Connection } from 'amqplib';
import { rabbitMQ } from '../../config/env';

let connection: Connection | null = null;
let channel: Channel | null = null;

async function getConnection(): Promise<Connection> {
  if (!connection) {
    connection = await client.connect(rabbitMQ.URI);
  }
  return connection;
}

async function getChannel(): Promise<Channel> {
  if (!channel) {
    const conn = await getConnection();
    channel = await conn.createChannel();
  }
  return channel;
}

export async function publish<T>(topic: string, message: T): Promise<void> {
  const channel = await getChannel();
  await channel.assertExchange(topic, 'topic', { durable: true });
  channel.publish(topic, '', Buffer.from(JSON.stringify(message)));

  console.log(`Published to ${topic}, message: ${JSON.stringify(message)}`);
}

export async function subscribe<T>(
  topic: string,
  handler: (msg: T) => void
): Promise<void> {
  const channel = await getChannel();

  await channel.assertExchange(topic, 'topic', { durable: true });
  const queue = await channel.assertQueue('', { exclusive: true });

  await channel.bindQueue(queue.queue, topic, '');

  await channel.consume(
    queue.queue,
    (message) => {
      if (message) {
        const msg: T = JSON.parse(message.content.toString());
        handler(msg);
        channel.ack(message);
      }
    },
    { noAck: false }
  );
}

export * as rabbit from '.';