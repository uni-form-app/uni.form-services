import { ProductStatus } from '@prisma/client';

export class Product {
  id: string;
  name: string;
  description: string;
  size: string;
  school: string;
  condition: number;
  price: number;
  status: ProductStatus;
  createdAt: Date;
  sellerId: string;
}
