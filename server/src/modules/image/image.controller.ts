import { Controller, Get, Post, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import * as fs from 'fs';

@ApiTags('Imagens')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Post('upload/:productId')
  @ApiOperation({ summary: 'Fazer upload de uma imagem para um produto' })
  @ApiParam({ name: 'productId', description: 'ID do produto ao qual a imagem será associada' })
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
        destination: (req, file, cb) => {
          const productId = req.params.productId;
          const dir = `./images/${productId}`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('productId') productId: string) {
    return this.imageService.uploadImage(file, productId);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Listar todas as imagens de um produto' })
  @ApiParam({ name: 'productId', description: 'ID do produto cujas imagens serão listadas' })
  @ApiResponse({ status: 200, description: 'Lista de imagens retornada com sucesso' })
  findByProductId(@Param('productId') productId: string) {
    return this.imageService.findByProductId(productId);
  }
}
