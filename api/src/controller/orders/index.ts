import { NextFunction, Response } from "express";
import { orderService } from "../../service/order";
import { Req } from "../../utils/types";
import { Create, Pay, Get } from "../../models/order";

export const create = async (req: Req<Create>, res: Response, next: NextFunction) => {
  try {
    const { body: { ...data }, user } = req;
    const order = await orderService.create({ ...data, buyerId: user.id });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const get = async (req: Req<Get>, res: Response, next: NextFunction) => {
  try {
    const { user, query: { status } } = req;
    console.log(status)

    const orders = await orderService.get({ userId: user.id, status });
    if (!orders) {
      res.status(404).json({ message: "No orders found" });
      return;
    }

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

export const pay = async (req: Req<Pay>, res: Response, next: NextFunction) => {
  try {
    const { params: { orderId }, user } = req;
    const order = await orderService.pay({ orderId });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

export * as orderController from ".";