import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { User } from '../auth/decorators/user.decorator';
import { User as UserPayload } from 'src/modules/users/dto/user';

@ApiTags('Endereços')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo endereço' })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({ status: 201, description: 'Endereço criado com sucesso' })
  create(
    @Body() createAddressDto: CreateAddressDto,
    @User() user: UserPayload,
  ) {
    return this.addressService.create(createAddressDto, user.id!);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os endereços' })
  @ApiResponse({ status: 200, description: 'Lista de endereços' })
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um endereço pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do endereço' })
  @ApiResponse({ status: 200, description: 'Detalhes do endereço' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um endereço pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do endereço' })
  @ApiBody({ type: UpdateAddressDto })
  @ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um endereço pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do endereço' })
  @ApiResponse({ status: 200, description: 'Endereço removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
