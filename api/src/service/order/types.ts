import { Order } from "../../models/order";

export namespace Create {
  export type Args = Order;
}

export namespace Get {
  export type Args = {
    orderId: string;
  }
}

export namespace Pay {
  export type Args = {
    orderId: string;
  }
}