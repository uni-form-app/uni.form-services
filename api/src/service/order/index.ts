import { OrderStatus } from "@prisma/client";
import pg from "../../libs/prisma";
import { Create, Get, GetUnique } from "./types";

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


  return pg.$transaction(async (client) => {
    const order = await client.order.create({
      data
    });

    await client.product.update({
      where: {
        id: order.id
      },
      data: {
        status: "SOLD"
      }
    });

    return order;
  });
};


export * as orderService from ".";