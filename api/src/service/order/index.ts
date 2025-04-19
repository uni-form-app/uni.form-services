import pg from "../../libs/prisma";
import { productService } from "../product";
import { Create } from "./types";

export const create = async (args: Create.Args) => {
  const { ...data } = args;

  const product = await productService.getById(data.productId);

  const order = await pg.order.create({
    data
  });

  // TODO: Notify rabbitMQ
  return order;
};

export * as orderService from ".";