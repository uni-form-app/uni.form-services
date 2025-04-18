import { NextFunction, Response } from "express";
import { partnerService } from "../../service/partner";
import { Req } from "../../utils/types";
import { create as Create, update as Update, exclude as Exclude } from "../../models/partner";

export const create = async (req: Req<Create>, res: Response, next: NextFunction) => {
  try {
    const { body: { ...data }, user } = req;

    await partnerService.create({ ...data, ownerId: user.id });

    res.status(201).json({ message: "partner created" });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Req<Update>, res: Response, next: NextFunction) => {
  try {
    const { params: { partnerId }, body: { ...data } } = req;
    await partnerService.update(partnerId, data);
    res.status(200).json({ message: "partner updated" });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Req<Exclude>, res: Response, next: NextFunction) => {
  try {
    const { params: { partnerId } } = req;
    await partnerService.remove(partnerId);
    res.status(200).json({ message: "partner deleted" });
  } catch (error) {
    next(error);
  }
};

export * as partnerController from ".";