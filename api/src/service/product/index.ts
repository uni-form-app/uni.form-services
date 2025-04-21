import path from "path";
import pg from "../../libs/prisma";
import { Create, Get } from "./types";
import fs from "fs";
import { rabbit } from "../../libs/rabbitmq";
import { config } from "../../config/env";

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

export const uploadImage = async (id: string, file: Express.Multer.File) => {
  try {
    const filePath = path.join(__dirname, '../../../uploads', file.filename);
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = imageBuffer.toString('base64');

    // salvar path da imagem no banco 
    return pg.$transaction(async (client) => {
      const image = await client.productImages.create({
        data: {
          productId: id,
          path: file.filename,
        }
      })

      // publicar mensagem no rabbitmq para que ela sejá analizada pela IA
      rabbit.publish<{ imageId: string, image: string }>(config.rabbitMQ.TOPICS.RABBIT_IMAGE_PROCESS, {
        imageId: image.id,
        image: base64Image
      });
    });

  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed");
  }
};

export * as productService from ".";