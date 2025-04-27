import { Product } from "../../models/product";

export namespace Create {
  export interface Args extends Product {
    file: Express.Multer.File;
  }
}

export namespace Get {
  export type Args = {
    sortBy?: string;
    order?: string;
    search?: string;
  };
}

