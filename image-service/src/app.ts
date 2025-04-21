import { config } from "./config/env";
import { ImageHandler } from "./handler/handler";
import { MongoDB } from "./lib/mongodb";
import { RabbitMQ } from "./lib/rabbit";
import { ImageService } from "./service/service";

async function run() {
  console.log("[APP] Aguardando mensagens...");

  const rabbit = new RabbitMQ(config.rabbitMQ.URI)
  const mongoDB = new MongoDB(config.mongodb.URI);
  const imageService = new ImageService(mongoDB);
  const consumer = new ImageHandler(rabbit, imageService);

  await consumer.consume();
}

run()