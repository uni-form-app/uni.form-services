import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AddressService {
  constructor(
    private readonly userService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: CreateAddressDto, userId: string) {
    const isPartner = await this.userService.isPartner(userId);

    return this.prisma.address.create({
      data: {
        ...data,
        ...(isPartner ? { partnerId: userId } : { userId }),
      },
    });
  }

  async findAll() {
    return this.prisma.address.findMany();
  }

  async findOne(id: string) {
    const address = await this.prisma.address.findUnique({ where: { id } });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.prisma.address.findUnique({ where: { id } });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  async remove(id: string) {
    const address = await this.prisma.address.findUnique({ where: { id } });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return this.prisma.address.delete({ where: { id } });
  }
}
