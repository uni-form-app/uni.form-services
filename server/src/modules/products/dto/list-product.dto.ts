import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Condition } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListProductDto {
  @ApiPropertyOptional({ description: 'Nome do produto' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Escola associada ao produto' })
  @IsOptional()
  @IsString()
  school?: string;

  @ApiPropertyOptional({ description: 'Condição do produto', enum: Condition })
  @IsOptional()
  @IsEnum(Condition)
  condition?: Condition;
}