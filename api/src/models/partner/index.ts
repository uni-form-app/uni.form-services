import { z } from 'zod';
import * as schema from './schema';

export interface Partner {
  name: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  ownerId: string;
}

export type Create = z.infer<typeof schema.create>;
export type Update = z.infer<typeof schema.update>;
export type Exclude = z.infer<typeof schema.exclude>;
export type Get = z.infer<typeof schema.get>;