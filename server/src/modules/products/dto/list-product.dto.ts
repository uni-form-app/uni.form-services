import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
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

  @ApiPropertyOptional({
    description: 'Condição do produto',
    minimum: 0,
    maximum: 10,
  })
  @ApiPropertyOptional({ description: 'Condição do produto (0-10)' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  condition?: number;
}
