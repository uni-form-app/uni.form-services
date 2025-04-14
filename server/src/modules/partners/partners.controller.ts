import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { User } from '../auth/decorators/user.decorator';
import { User as UserPayload } from '../users/dto/user';

@ApiTags('Parceiros')
@ApiBearerAuth()
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo parceiro' })
  @ApiBody({
    type: CreatePartnerDto,
    description: 'Dados para criar um novo parceiro',
    examples: {
      example1: {
        value: {
          name: 'Parceiro Exemplo',
          email: 'parceiro@exemplo.com',
          phone: '123456789',
          addressId: 'uuid',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Parceiro criado com sucesso',
    schema: {
      example: {
        id: 'uuid',
        name: 'Parceiro Exemplo',
        email: 'parceiro@exemplo.com',
        phone: '123456789',
        addressId: 'uuid',
        createdAt: '2025-04-10T00:00:00.000Z',
      },
    },
  })
  create(
    @Body() createPartnerDto: CreatePartnerDto,
    @User() user: UserPayload,
  ) {
    return this.partnersService.create(createPartnerDto, user.id!);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os parceiros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de parceiros',
    schema: {
      example: [
        {
          id: 'uuid',
          name: 'Parceiro Exemplo',
          email: 'parceiro@exemplo.com',
          phone: '123456789',
          addressId: 'uuid',
          createdAt: '2025-04-10T00:00:00.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.partnersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um parceiro pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do parceiro', example: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes do parceiro',
    schema: {
      example: {
        id: 'uuid',
        name: 'Parceiro Exemplo',
        email: 'parceiro@exemplo.com',
        phone: '123456789',
        addressId: 'uuid',
        createdAt: '2025-04-10T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Parceiro não encontrado' })
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um parceiro pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do parceiro', example: 'uuid' })
  @ApiBody({
    type: UpdatePartnerDto,
    description: 'Dados para atualizar um parceiro existente',
  })
  @ApiResponse({
    status: 200,
    description: 'Parceiro atualizado com sucesso',
    schema: {
      example: {
        id: 'uuid',
        name: 'Parceiro Atualizado',
        email: 'parceiro@atualizado.com',
        phone: '987654321',
        addressId: 'uuid',
        createdAt: '2025-04-10T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Parceiro não encontrado' })
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnersService.update(id, updatePartnerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um parceiro pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do parceiro', example: 'uuid' })
  @ApiResponse({ status: 200, description: 'Parceiro removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Parceiro não encontrado' })
  remove(@Param('id') id: string) {
    return this.partnersService.remove(id);
  }
}
