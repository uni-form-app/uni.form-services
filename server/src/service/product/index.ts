import pg from "../../libs/prisma";
import { Create } from "./types";

export const create = async (args: Create.Args) => {
  const { ...data } = args;

  const product = await pg.product.create({
    data
  });
  return product;
};

export const get = async () => {
  return await pg.product.findMany();
};

export const getById = async (id: string) => {
  return await pg.product.findUniqueOrThrow({
    where: { id },
  });
};

export const update = async (id: string, data: Partial<Create.Args>) => {
  return await pg.product.update({
    where: { id },
    data,
  });
};

export const remove = async (id: string) => {
  return await pg.product.delete({
    where: { id },
  });
};

export * as productService from ".";