import * as client from 'amqplib';
import { Channel, Connection } from 'amqplib';

export class RabbitMQ {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private uri: string) { }

  private async getConnection(): Promise<Connection> {
    if (!this.connection) {
      this.connection = await client.connect(this.uri);
      console.log('✅ Connected to RabbitMQ');
    }
    return this.connection;
  }

  private async getChannel(): Promise<Channel> {
    if (!this.channel) {
      const conn = await this.getConnection();
      this.channel = await conn.createChannel();
      console.log('✅ Channel created');
    }
    return this.channel;
  }

  public async publish<T>(topic: string, message: T): Promise<void> {
    const channel = await this.getChannel();
    await channel.assertExchange(topic, 'topic', { durable: true });

    channel.publish(topic, '', Buffer.from(JSON.stringify(message)));
  }

  public async subscribe<T>(
    topic: string,
    handler: (msg: T) => void
  ): Promise<void> {
    const channel = await this.getChannel();

    await channel.assertExchange(topic, 'topic', { durable: true });

    // Fila exclusiva e temporária para esse consumidor
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
}
