import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Injectable()
export class UsersService {
  constructor(
    private readonly db: PrismaService
  ) { }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully', schema: { example: { id: 'uuid', username: 'user', email: 'user@example.com', createdAt: '2025-04-10T00:00:00.000Z' } } })
  async create(data: CreateUserDto) {
    await this.db.user.create({
      data
    });
  }

  @ApiOperation({ summary: 'Get a user by email' })
  @ApiResponse({ status: 200, description: 'User found', schema: { example: { id: 'uuid', username: 'user', email: 'user@example.com', createdAt: '2025-04-10T00:00:00.000Z' } } })
  @ApiResponse({ status: 404, description: 'User not found' })
  getByEmail(email: string) {
    return this.db.user.findUnique({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        password: true,
      },
      where: {
        email
      },
    });
  }
}
