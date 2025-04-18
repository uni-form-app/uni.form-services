import { Product } from "../../models/product";

export namespace Create {
  export type Args = Product
}

export namespace Get {
  export type Args = {
    sortBy?: string;
    order?: string;
    search?: string;
  };
}

