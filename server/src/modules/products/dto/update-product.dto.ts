import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Condition } from '@prisma/client';

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
    description: 'Condição opcional do produto',
    enum: Condition,
  })
  condition?: Condition;
}
