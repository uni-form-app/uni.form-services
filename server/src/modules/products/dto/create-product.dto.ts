import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Condition } from '@prisma/client';
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

  @ApiProperty({ description: 'Condição do produto', enum: Condition })
  @IsEnum(Condition)
  @IsNotEmpty()
  condition: Condition;
}
