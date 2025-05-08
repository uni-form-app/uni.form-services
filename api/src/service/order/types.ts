import { OrderStatus } from "@prisma/client";
import { Order } from "../../models/order";

export namespace Create {
  export type Args = Order;
}

export namespace GetUnique {
  export type Args = {
    orderId: string;
  }
}
export namespace Get {
  export type Args = {
    userId: string;
    status?: OrderStatus[] | OrderStatus;
  }
}

export namespace Pay {
  export type Args = {
    orderId: string;
  }
}