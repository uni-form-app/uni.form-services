import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateProductDto, sellerId: string) {
    return this.prisma.product.create({
      data: {
        ...data,
        sellerId,
      },
    });
  }

  async get() {
    return this.prisma.product.findMany({
      include: {
        seller: {
          select: {
            id: true,
            username: true,
          },
        },
        images: {
          select: {
            id: true,
            path: true,
          },
        },
      },
    });
  }

  async getUnique(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.prisma.product.delete({ where: { id } });
  }
}
