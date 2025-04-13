import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Ensure PrismaModule is imported
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule { }
