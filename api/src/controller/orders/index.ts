import { NextFunction, Response } from "express";
import { orderService } from "../../service/order";
import { Req } from "../../utils/types";
import { Create } from "../../models/order";

export const create = async (req: Req<Create>, res: Response, next: NextFunction) => {
  try {
    const { body: { ...data }, user } = req;
    const order = await orderService.create({ ...data, buyerId: user.id });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export * as orderController from ".";