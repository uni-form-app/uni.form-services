import { ProductStatus } from "@prisma/client";
import { z } from "zod";

export const create = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be a positive number"),
  description: z.string().optional(),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
});

export const update = create.partial();

export const get = z.object({

})

export interface Product {
  title: string,
  description: string,
  size: string,
  school: string,
  condition: number,
  price: number,
  status: ProductStatus
  sellerId: string
}
