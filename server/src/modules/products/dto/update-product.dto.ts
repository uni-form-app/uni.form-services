import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProductStatus } from '@prisma/client';
import { IsNumber, IsEnum, IsInt, Min, Max } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ description: 'Nome opcional do produto' })
  name?: string;

  @ApiPropertyOptional({ description: 'Descrição opcional do produto' })
  description?: string;

  @ApiPropertyOptional({ description: 'Tamanho opcional do produto' })
  size?: string;

  @ApiPropertyOptional({ description: 'Escola opcional associada ao produto' })
  school?: string;

  @ApiPropertyOptional({
    description: 'Condição opcional do produto (0-10)',
    minimum: 0,
    maximum: 10,
  })
  @IsInt()
  @Min(0)
  @Max(10)
  condition?: number;

  @ApiPropertyOptional({ description: 'Preço opcional do produto' })
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    description: 'Status opcional do produto',
    enum: ProductStatus,
  })
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
