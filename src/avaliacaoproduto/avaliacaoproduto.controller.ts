import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvaliacaoprodutoService } from './avaliacaoproduto.service';
import { CreateAvaliacaoprodutoDto } from './dto/create-avaliacaoproduto.dto';
import { UpdateAvaliacaoprodutoDto } from './dto/update-avaliacaoproduto.dto';

@Controller('avaliacaoproduto')
export class AvaliacaoprodutoController {
  constructor(private readonly avaliacaoprodutoService: AvaliacaoprodutoService) {}

  @Post()
  create(@Body() createAvaliacaoprodutoDto: CreateAvaliacaoprodutoDto) {
    return this.avaliacaoprodutoService.create(createAvaliacaoprodutoDto);
  }

  @Get()
  findAll() {
    return this.avaliacaoprodutoService.findAll();
  }

  // A ROTA QUE O SEU FRONT-END PRECISA ESTÁ AQUI:
  @Get('produto/:produtoId')
  findByProduto(@Param('produtoId') produtoId: string) {
    return this.avaliacaoprodutoService.findByProduto(+produtoId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvaliacaoprodutoDto: UpdateAvaliacaoprodutoDto) {
    return this.avaliacaoprodutoService.update(+id, updateAvaliacaoprodutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avaliacaoprodutoService.remove(+id);
  }
}