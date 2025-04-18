import { Partner } from "../../models/partner";

export namespace Create {
  export type Args = Partner;
}

export namespace Update {
  export type Args = Partial<Partner>;
}

export namespace Remove {
  export type Args = string;
}