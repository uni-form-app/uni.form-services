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
import { User } from '../auth/decorators/user.decorator';
import { User as UserPayload } from '../users/dto/user';

@ApiTags('Produtos')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

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
          price: 100.0,
          status: 'AVAILABLE',
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
  create(
    @Body() createProductDto: CreateProductDto,
    @User() user: UserPayload,
  ) {
    return this.productsService.create(createProductDto, user.id!);
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
    return this.productsService.get();
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
    return this.productsService.getUnique(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um produto pelo ID' })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Dados para atualizar um produto existente',
    examples: {
      example1: {
        value: {
          name: 'Produto Atualizado',
          price: 150.0,
          status: 'PENDING',
        },
      },
    },
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
