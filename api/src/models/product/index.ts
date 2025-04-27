import { ProductStatus } from "@prisma/client";
import * as schema from "./schemas";
import { z } from "zod";

export interface Product {
  name: string,
  description: string,
  size: string,
  school: string,
  price: number,
  status: ProductStatus
  sellerId: string
}

export type Create = z.infer<typeof schema.create>;
export type Update = z.infer<typeof schema.update>;
export type Get = z.infer<typeof schema.get>;
export type GetUnique = z.infer<typeof schema.getUnique>;
export type Remove = z.infer<typeof schema.remove>;
