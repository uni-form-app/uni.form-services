import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Condition } from '@prisma/client';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsString()
  @IsNotEmpty()
  school: string;

  @IsEnum(Condition)
  @IsNotEmpty()
  condition: Condition;
}
