import { NextFunction, Request, Response } from "express";
import { productService } from "../../service/product";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body: { ...data } } = req;

    await productService.create(data);

    res.status(201).json({ message: "product created" });

  } catch (error) {
    next(error);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query: { sortBy, order, search } } = req;
    const products = await productService.get({ sortBy, order, search });

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

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params: { id }, body: { ...data } } = req;

    await productService.update(id, data);

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