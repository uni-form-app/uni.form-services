import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) { }

  async create(data: CreateUserDto) {
    await this.db.user.create({
      data,
    });
  }

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
        email,
      },
    });
  }

  async isPartner(id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
      select: {
        Partner: {
          select: {
            id: true,
          },
        }
      },
    });

    if (!user)
      return false;

    return !!user.Partner;
  }
}
