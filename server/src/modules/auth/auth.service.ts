import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SignInDto } from 'src/modules/auth/dto/sign-in';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(data: SignInDto) {
    const { email, password } = data;

    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new NotFoundException('user-not-found');
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      throw new NotFoundException('user-credentials-invalid');
    }

    const payload = {
      ...user,
      password: undefined,
    };

    const token = this.jwtService.sign(payload);

    return {
      ...payload,
      token,
    };
  }

  async signUp(data: CreateUserDto) {
    const { password: _password, ...user } = data;

    const isEmailExists = await this.usersService.getByEmail(data.email);

    if (isEmailExists) throw new BadRequestException('email-in-use');

    const password = await argon2.hash(_password);

    return this.usersService.create({
      ...user,
      password,
    });
  }
}
