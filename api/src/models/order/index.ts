import { z } from 'zod';
import * as schema from './schema';

export interface Order {
  productId: string;
  buyerId: string;
  partnerId: string;
}

export type Create = z.infer<typeof schema.create>;
