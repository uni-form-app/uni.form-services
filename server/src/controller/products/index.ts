import { NextFunction, Request, Response } from "express";
import { productService } from "../../service/product";
import { Req } from "../../utils/types";
import { Create, Get, Update } from "../../models/product";

export const create = async (req: Req<Create>, res: Response, next: NextFunction) => {
  try {
    const { body: { ...data }, user } = req;

    await productService.create({
      ...data,
      sellerId: user.id,
    });

    res.status(201).json({ message: "product created" });

  } catch (error) {
    next(error);
  }
};

export const get = async (req: Req<Get>, res: Response, next: NextFunction) => {
  try {
    const { query: { ...filters } } = req;

    const products = await productService.get({ ...filters });

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getUnique = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params: { id } } = req;

    const product = await productService.getById(id);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Req<Update>, res: Response, next: NextFunction) => {
  try {
    const { params: { productId }, body: { ...data } } = req;

    await productService.update(productId, data);

    res.status(200).json({ message: "product updated" });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params: { id } } = req;

    await productService.remove(id);

    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    next(error);
  }
};

export * as productController from ".";