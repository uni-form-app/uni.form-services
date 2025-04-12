import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Produtos')
@ApiBearerAuth() // Adiciona autenticação JWT para todas as rotas deste controlador
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiBody({
    type: CreateProductDto,
    description: 'Dados para criar um novo produto',
    examples: {
      example1: {
        value: {
          name: 'Produto Exemplo',
          description: 'Descrição do produto exemplo',
          size: 'M',
          school: 'Escola Exemplo',
          condition: 'NOVO',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso',
    schema: {
      example: {
        id: 'uuid',
        name: 'Nome do Produto',
        description: 'Descrição do Produto',
        size: 'M',
        school: 'Nome da Escola',
        condition: 'NOVO',
        createdAt: '2025-04-10T00:00:00.000Z',
      },
    },
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos',
    schema: {
      example: [
        {
          id: 'uuid',
          name: 'Nome do Produto',
          description: 'Descrição do Produto',
          size: 'M',
          school: 'Nome da Escola',
          condition: 'NOVO',
          createdAt: '2025-04-10T00:00:00.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um produto pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes do produto',
    schema: {
      example: {
        id: 'uuid',
        name: 'Nome do Produto',
        description: 'Descrição do Produto',
        size: 'M',
        school: 'Nome da Escola',
        condition: 'NOVO',
        createdAt: '2025-04-10T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um produto pelo ID' })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Dados para atualizar um produto existente',
  })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso',
    schema: {
      example: {
        id: 'uuid',
        name: 'Nome Atualizado do Produto',
        description: 'Descrição Atualizada do Produto',
        size: 'L',
        school: 'Nome Atualizado da Escola',
        condition: 'USADO',
        createdAt: '2025-04-10T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Produto removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
