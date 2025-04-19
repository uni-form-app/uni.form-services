import { config } from "../../config/env";
import pg from "../../libs/prisma";
import { rabbit } from "../../libs/rabbitmq";
import { productService } from "../product";
import { Create, Pay } from "./types";

export const create = async (args: Create.Args) => {
  const { ...data } = args;

  const product = await productService.getById(data.productId);

  const order = await pg.order.create({
    data
  });

  return order;
};

export const pay = async (args: Pay.Args) => {
  const { orderId } = args;

  await rabbit.publish<Pay.Args>(config.rabbitMQ.TOPICS.RABBIT_PAYMENT_PROCESS, {
    orderId
  })
};

export * as orderService from ".";