import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs/promises';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) { }

  async uploadImage(file: Express.Multer.File, productId: string) {
    if (!file || !file.path) {
      throw new Error('Arquivo inválido ou não enviado corretamente');
    }

    try {
      const image = await this.prisma.image.create({
        data: {
          path: file.path,
          productId,
        },
      });

      return image;
    } catch (error) {
      await fs.unlink(file.path);
      throw error;
    }
  }
}
