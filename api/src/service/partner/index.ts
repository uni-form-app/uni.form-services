import pg from "../../libs/prisma";
import { Create, Update, Remove } from "./types";

export const create = async (args: Create.Args) => {
  const { ...data } = args;

  const partner = await pg.partner.create({
    data
  });
  return partner;
};

export const update = async (id: string, args: Update.Args) => {
  const { ...data } = args;
  const partner = await pg.partner.update({
    where: { id },
    data,
  });
  return partner;
};

export const remove = async (id: Remove.Args) => {
  await pg.partner.delete({
    where: { id },
  });
};

export * as partnerService from ".";
