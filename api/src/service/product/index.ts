import pg from "../../libs/prisma";
import { Create, Get } from "./types";

export const create = async (args: Create.Args) => {
  const { ...data } = args;

  const product = await pg.product.create({
    data
  });
  return product;
};

export const get = async (args: Get.Args) => {
  const { sortBy, order, search } = args;

  return await pg.product.findMany({
    where: {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { school: { contains: search, mode: "insensitive" } },
        ],
      })
    },
    orderBy: {
      [sortBy || "createdAt"]: order || "desc",
    }
  });
};

export const getById = async (id: string) => {
  return await pg.product.findUnique({
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