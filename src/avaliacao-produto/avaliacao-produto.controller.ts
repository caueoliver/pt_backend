import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AvaliacaoProdutoService } from './avaliacao-produto.service';
import { CreateAvaliacaoProdutoDto } from './dto/create-avaliacao-produto.dto';
import { UpdateAvaliacaoProdutoDto } from './dto/update-avaliacao-produto.dto';

@Controller('avaliacao_produto')
export class AvaliacaoProdutoController {
  constructor(private readonly avaliacaoService: AvaliacaoProdutoService) {}

  // Criar nova avaliacao
  @Post()
  async criarAvaliacao(@Body() dados: CreateAvaliacaoProdutoDto) {
    return await this.avaliacaoService.create(dados);
  }

  // Lista todas avaliacoes
  @Get()
  async listarAvaliacoes() {
    return await this.avaliacaoService.findAll();
  }
  @Get('user/:userId')
  async buscarPorUsuario(@Param('userId', ParseIntPipe) userId: number) {
    return await this.avaliacaoService.findByUsuario(userId); 
  }

  // Busca avaliacao especifica
  @Get(':id')
  async buscarAvaliacao(@Param('id', ParseIntPipe) id: number) {
    return await this.avaliacaoService.findOne(id);
  }

  // Edita a avaliação
  @Patch(':id')
  async atualizarAvaliacao(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: UpdateAvaliacaoProdutoDto,
  ) {
    return await this.avaliacaoService.update(id, dados);
  }

  // Deleta a avaliacao
  @Delete(':id')
  async deletarAvaliacao(@Param('id', ParseIntPipe) id: number) {
    return await this.avaliacaoService.remove(id);
  }
}