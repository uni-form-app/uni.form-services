import { z } from 'zod';
import * as schema from './schema';

export interface Partner {
  name: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
}

export type create = z.infer<typeof schema.create>;
export type update = z.infer<typeof schema.update>;
export type exclude = z.infer<typeof schema.exclude>;