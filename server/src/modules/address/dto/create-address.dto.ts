import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ description: 'Street name' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ description: 'House or building number' })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({ description: 'Neighborhood' })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({ description: 'City name' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'State name' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'Zip code' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ description: 'Latitude coordinate' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ description: 'Longitude coordinate' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
