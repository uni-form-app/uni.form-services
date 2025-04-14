import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FileService } from './file/file.service'; // Importing FileService

@Module({
  imports: [PrismaModule],
  providers: [ImageService, FileService], // Registering FileService
  controllers: [ImageController],
})
export class ImageModule {}
