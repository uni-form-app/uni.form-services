import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from './file/file.service'; // New file handling service

@Injectable()
export class ImageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService, // Injecting the new service
  ) {}

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
      await this.fileService.deleteFile(file.path); // Delegating file deletion
      throw error;
    }
  }
}
