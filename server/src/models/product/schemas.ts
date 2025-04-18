import { ProductStatus } from "@prisma/client";
import { z } from "zod";

export const create = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    size: z.string().min(1, "Size is required"),
    school: z.string().min(1, "School is required"),
    condition: z.number().min(1, "Condition is required"),
    price: z.number().min(1, "Price is required"),
    status: z.nativeEnum(ProductStatus).default(ProductStatus.AVAILABLE),
  })
});

export const update = z.object({
  params: z.object({
    productId: z.string().uuid("Invalid product id"),
  }),
  body: create.shape.body.partial(),
});

export const get = z.object({
  query: z.object({
    sortBy: z.enum(["price", "createdAt", "name",]).default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc"),
    search: z.string().optional(),
  }),
})

export const getUnique = z.object({
  params: z.object({
    productId: z.string().uuid("Invalid product id"),
  }),
});

export const remove = z.object({
  params: z.object({
    productId: z.string().uuid("Invalid product id"),
  }),
});