import { User } from "./user";
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto extends User {
  @ApiPropertyOptional({ description: 'Data de criação do usuário' })
  createdAt?: Date;
}