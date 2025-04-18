import { Request } from "express";

export type Req<T extends { body?: any; params?: any; query?: any }> = Request<
  T["params"],
  any,
  T["body"],
  T["query"]
>;
