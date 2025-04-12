import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SignInDto } from 'src/modules/auth/dto/sign-in';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/users/dto/create-user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignInDto) {
    const { email, password } = data;
    const user = await this.usersService.getByEmail(email);

    if (!user) throw new NotFoundException('user-not-found');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new NotFoundException('user-credentials-invalid');

    const payload = {
      ...user,
      password: undefined,
    };

    return {
      ...payload,
      token: this.jwtService.sign(payload),
    };
  }

  async signUp(data: CreateUserDto) {
    const { password: _password, ...user } = data;

    const isEmailExists = await this.usersService.getByEmail(data.email);

    if (isEmailExists) throw new BadRequestException('email-in-use');

    const password = await bcrypt.hash(_password, 15); // 15 é o número de rounds de hash

    return this.usersService.create({
      ...user,
      password,
    });
  }
}
