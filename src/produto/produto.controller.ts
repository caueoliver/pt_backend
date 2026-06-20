import { Controller, Get, Post, Body, Delete, Put, Param } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() data: CreateProdutoDto) {
    return this.produtoService.create(data);
  }

  @Get()
  async findAll() {
    return this.produtoService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateProdutoDto) {
    return this.produtoService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.produtoService.delete(Number(id));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.produtoService.findOne(Number(id));
  }
}