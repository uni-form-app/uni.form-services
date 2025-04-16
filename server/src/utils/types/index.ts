import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export type ZodSchema = {
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
};

export type InferRequestType<T extends ZodSchema> = Request<
  T["params"] extends z.ZodTypeAny ? z.infer<T["params"]> : {},
  any,
  T["body"] extends z.ZodTypeAny ? z.infer<T["body"]> : {},
  T["query"] extends z.ZodTypeAny ? z.infer<T["query"]> : {}
>;

export const zodToExpress = <T extends ZodSchema>(
  schema: T,
  handler: (
    req: InferRequestType<T>,
    res: Response,
    next: NextFunction
  ) => any
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (schema.body) req.body = await schema.body.parseAsync(req.body);
      if (schema.query) req.query = await schema.query.parseAsync(req.query);
      if (schema.params) req.params = await schema.params.parseAsync(req.params);

      return handler(req as InferRequestType<T>, res, next);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          errors: err.errors.map((e) => ({
            path: e.path,
            message: e.message,
          })),
        });
      } else {
        next(err);
      }
    }
  };
};
