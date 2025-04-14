import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import * as fs from 'fs/promises';

@ApiTags('Imagens')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload/:productId')
  @ApiOperation({ summary: 'Fazer upload de uma imagem para um produto' })
  @ApiParam({
    name: 'productId',
    description: 'ID do produto ao qual a imagem será associada',
  })
  @ApiBody({
    description: 'Arquivo de imagem a ser enviado',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Imagem enviada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao enviar a imagem' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: async (req, file, cb) => {
          const productId = req.params.productId;
          const dir = `./images/${productId}`;

          try {
            await fs.mkdir(dir, { recursive: true });
            cb(null, dir);
          } catch (err) {
            cb(err as Error, dir);
          }
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ];
        if (!file || !allowedTypes.includes(file.mimetype)) {
          return cb(new BadRequestException('Tipo de arquivo inválido'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('productId') productId: string,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Arquivo inválido ou não enviado corretamente',
      );
    }

    const image = await this.imageService.uploadImage(file, productId);
    return image;
  }
}
