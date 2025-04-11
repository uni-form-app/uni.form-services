import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from 'src/modules/auth/dto/sign-in';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user';
import { Public } from './decorators/public.decorator';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
@Public()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Realizar login de um usuario' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'User signed in successfully', schema: { example: { id: 'uuid', username: 'user', email: 'user@example.com', token: 'jwt-token' } } })
  @ApiResponse({ status: 404, description: 'user-credentials-invalid' })
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }

  @Post('/create')
  @ApiOperation({ summary: 'Criar um novo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'user-created' })
  @ApiResponse({ status: 400, description: 'Email already in use' })
  signUp(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }
}
