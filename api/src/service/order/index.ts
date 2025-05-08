import { OrderStatus } from "@prisma/client";
import { config } from "../../config/env";
import pg from "../../libs/prisma";
import { rabbit } from "../../libs/rabbitmq";
import { productService } from "../product";
import { Create, Get, GetUnique, Pay } from "./types";

export const get = async (args: Get.Args) => {
  const { userId, status } = args;

  const normalizedStatus =
    status === undefined
      ? undefined
      : Array.isArray(status)
        ? status.map(s => s.toUpperCase() as OrderStatus)
        : [status.toUpperCase() as OrderStatus];

  const orders = await pg.order.findMany({
    select: {
      id: true,
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          ProductImages: {
            select: {
              id: true,
              path: true,
            },
          }
        },
      },
      partner: {
        select: {
          id: true,
          address: true,
          city: true,
        },
      },
      status: true,
      confirmedAt: true,
      createdAt: true,
    },
    where: {
      ...(normalizedStatus && { status: { in: normalizedStatus } }),
      buyerId: userId
    }
  });
  return orders;
}

export const getUnique = async (args: GetUnique.Args) => {
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

  const order = await getUnique({ orderId });
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