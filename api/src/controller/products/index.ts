import { NextFunction, Request, Response } from "express";
import { productService } from "../../service/product";
import { Req } from "../../utils/types";
import { Create, Get, GetUnique, Remove, Update } from "../../models/product";

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

export const getUnique = async (req: Req<GetUnique>, res: Response, next: NextFunction) => {
  try {
    const { params: { productId } } = req;

    const product = await productService.getById(productId);

    if (!product) {
      res.status(404).json({ message: "product not found" });
      return;
    }

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

export const remove = async (req: Req<Remove>, res: Response, next: NextFunction) => {
  try {
    const { params: { productId } } = req;

    await productService.remove(productId);

    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    next(error);
  }
};

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params: { productId }, file } = req;

    if (!file) {
      res.status(400).json({ message: "No files uploaded" });
      return;
    }

    await productService.uploadImage(productId, file);

    res.status(200).json({ message: "product image updated" });
  } catch (error) {
    next(error);
  }
}



export * as productController from ".";