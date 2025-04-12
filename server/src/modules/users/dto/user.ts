import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'Identificador único do usuário' })
  id?: string;

  @ApiProperty({ description: 'Nome de usuário' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Email do usuário' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsStrongPassword()
  password: string;
}
