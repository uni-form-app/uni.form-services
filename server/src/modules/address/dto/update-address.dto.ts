import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @ApiPropertyOptional({ description: 'Street name' })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiPropertyOptional({ description: 'House or building number' })
  @IsString()
  @IsOptional()
  number?: string;

  @ApiPropertyOptional({ description: 'Neighborhood' })
  @IsString()
  @IsOptional()
  neighborhood?: string;

  @ApiPropertyOptional({ description: 'City name' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ description: 'State name' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ description: 'Zip code' })
  @IsString()
  @IsOptional()
  zipCode?: string;

  @ApiPropertyOptional({ description: 'Latitude coordinate' })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({ description: 'Longitude coordinate' })
  @IsNumber()
  @IsOptional()
  longitude?: number;
}
