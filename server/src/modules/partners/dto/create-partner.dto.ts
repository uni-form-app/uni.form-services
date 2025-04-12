import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({ description: 'Name of the partner' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email of the partner' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Phone number of the partner' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Address ID of the partner' })
  @IsString()
  @IsNotEmpty()
  addressId: string;
}
