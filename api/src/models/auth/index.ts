import { z } from "zod";
import * as schema from "./schema";

export type Login = z.infer<typeof schema.login>;
export type Create = z.infer<typeof schema.create>;