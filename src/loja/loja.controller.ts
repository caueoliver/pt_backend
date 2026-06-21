import { Controller, Get, Post, Body, Delete, Put, Param, ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
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

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.lojaService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateLojaDto) {
    return this.lojaService.update(Number(id), data);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.lojaService.delete(Number(id));
  }

  @IsPublic()
  @Get(':id/reviews')
  async getReviewsByLoja(@Param('id') id: string) {
    return this.lojaService.getReviewsByLoja(Number(id));
  }

  @IsPublic()
  @Get(':id/produtos')
  async getProdutosByLoja(@Param('id', ParseIntPipe) id: number) {
    return this.lojaService.getProdutosByLoja(id);
  }

  @IsPublic()
  @Get(':id/melhores')
  async getMelhoresByLoja(@Param('id', ParseIntPipe) id: number) {
    return this.lojaService.getProdutosByLoja(id);
  }

}