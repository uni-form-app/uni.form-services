import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ProductStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nome do produto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Descrição do produto' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Tamanho do produto' })
  @IsString()
  @IsNotEmpty()
  size: string;

  @ApiProperty({ description: 'Escola associada ao produto' })
  @IsString()
  @IsNotEmpty()
  school: string;

  @ApiProperty({ description: 'Preço do produto' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'Status do produto', enum: ProductStatus })
  @IsEnum(ProductStatus)
  @IsNotEmpty()
  status: ProductStatus;

  @ApiProperty({
    description: 'Condição do produto (0-10)',
    minimum: 0,
    maximum: 10,
  })
  @IsInt()
  @Min(0)
  @Max(10)
  condition: number;
}
