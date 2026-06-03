import { Controller, Get, Post, Body, Delete, Put, Param } from '@nestjs/common';
import { LojaService } from './loja.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('loja')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Post()
  create(@Body() data: CreateLojaDto) {
    return this.lojaService.create(data);
  }

  @IsPublic()
  @Get('todos')
  async findAll() {
    return this.lojaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.lojaService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateLojaDto) {
    return this.lojaService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.lojaService.delete(Number(id));
  }
}