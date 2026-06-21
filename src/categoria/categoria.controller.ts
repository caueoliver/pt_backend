import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('categorias') 
export class CategoriasController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async criarCategoria(@Body() dados: { name: string; parentCategoryId?: number }) {
    return await this.categoriaService.create(dados.name, dados.parentCategoryId);
  }

  @IsPublic()
  @Get() 
  async findAll() {
    return await this.categoriaService.findAllFormatadas();
  }

  @Patch(':id')
  async atualizarCategoria(@Param('id') id: string, @Body() dados: { name: string }) {
    return await this.categoriaService.update(Number(id), dados.name);
  }

  @Delete(':id')
  async deletarCategoria(@Param('id') id: string) {
    return await this.categoriaService.delete(Number(id));
  }
}