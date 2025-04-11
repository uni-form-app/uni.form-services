import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Condition } from '@prisma/client';

export class ListProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  school?: string;

  @IsOptional()
  @IsEnum(Condition)
  condition?: Condition;
}