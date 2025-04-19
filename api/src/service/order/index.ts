import { config } from "../../config/env";
import pg from "../../libs/prisma";
import { rabbit } from "../../libs/rabbitmq";
import { productService } from "../product";
import { Create, Get, Pay } from "./types";

export const get = async (args: Get.Args) => {
  const { orderId } = args;

  const order = await pg.order.findFirst({
    where: {
      id: orderId
    }
  });

  return order;
};

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

  const order = await get({ orderId });
  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status !== "PENDING") {
    throw new Error("Order is not pending");
  }

  await rabbit.publish<Pay.Args>(config.rabbitMQ.TOPICS.RABBIT_PAYMENT_PROCESS, {
    orderId
  })
};

export * as orderService from ".";