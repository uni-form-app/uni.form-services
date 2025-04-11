import { User } from "./user";

export class CreateUserDto extends User {
  createdAt?: Date;
}