import * as config from "../config/env";
import { RabbitMQ } from "../lib/rabbit";
import { ImageService } from "../service/service";
import { ImageMessage } from "./types";

export class ImageHandler {
  constructor(
    private readonly rabbitMQ: RabbitMQ,
    private readonly imageService: ImageService
  ) { }

  async consume() {
    try {
      await this.rabbitMQ.subscribe(config.rabbitMQ.TOPICS.RABBIT_IMAGE_PROCESS, (msg: ImageMessage) => {
        console.log("[CONSUMER] Received message:", msg);
        this.imageService.process(msg)
      });
    } catch (error) {
      console.error("[CONSUMER] Error occurred:", error);
    }
  }
}