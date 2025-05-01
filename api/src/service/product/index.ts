import path from "path";
import pg from "../../libs/prisma";
import { Create, Get } from "./types";
import fs from "fs";
import { rabbit } from "../../libs/rabbitmq";
import { config } from "../../config/env";
import { Prisma } from "@prisma/client";

export const create = async (args: Create.Args) => {
  const { file, ...data } = args;

  if (typeof data.price === "string") {
    data.price = parseFloat(data.price);
  }

  return await pg.$transaction(async (client) => {
    const product = await client.product.create({
      data
    });

    await uploadImage(product.id, file, client);
  });
};

export const get = async (args: Get.Args) => {
  const { sortBy, order, search } = args;

  return await pg.product.findMany({
    include: {
      ProductImages: {
        select: {
          id: true,
          path: true,
        },
      },
    },
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
    include: {
      ProductImages: {
        select: {
          id: true,
          path: true,
        },
      },
    },
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

export const uploadImage = async (id: string, file: Express.Multer.File, client: Prisma.TransactionClient) => {
  try {
    const filePath = path.join(__dirname, '../../../uploads', file.filename);
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = imageBuffer.toString('base64');

    const image = await client.productImages.create({
      data: {
        productId: id,
        path: file.filename,
      }
    })

    rabbit.publish<{ imageId: string, image: string }>(config.rabbitMQ.TOPICS.RABBIT_IMAGE_PROCESS, {
      imageId: image.id,
      image: base64Image
    });

  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed");
  }
};

export * as productService from ".";