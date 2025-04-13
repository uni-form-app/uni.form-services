import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) { }

  async uploadImage(file: Express.Multer.File, productId: string) {
    if (!file || !file.buffer) {
      throw new Error('Arquivo inválido ou não enviado corretamente');
    }

    const imagesDir = path.join(__dirname, '../../../images', productId);
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const filePath = path.join(imagesDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);

    return this.prisma.image.create({
      data: {
        path: filePath,
        productId,
      },
    });
  }

  async findAll() {
    return this.prisma.image.findMany();
  }

  async findOne(id: string) {
    const image = await this.prisma.image.findUnique({ where: { id } });
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    return image;
  }

  async findByProductId(productId: string) {
    return this.prisma.image.findMany({
      where: { productId },
    });
  }

  async remove(id: string) {
    const image = await this.prisma.image.findUnique({ where: { id } });
    if (!image) {
      throw new NotFoundException('Image not found');
    }

    fs.unlinkSync(image.path);
    return this.prisma.image.delete({ where: { id } });
  }
}
