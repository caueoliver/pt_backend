import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvaliacaoProdutoService } from './avaliacao-produto.service';
import { CreateAvaliacaoProdutoDto } from './dto/create-avaliacao-produto.dto';
import { UpdateAvaliacaoProdutoDto } from './dto/update-avaliacao-produto.dto';
import { PrismaService } from '../prisma.service';

@Controller('avaliacao-produto')
export class AvaliacaoProdutoController {
  constructor(private readonly prisma: PrismaService) {}
  //criar nova avaliacao
  @Post()
  async criarAvaliacao(
    @Body() dados: { usuarioId: number; productId: number; nota: number; comentario?: string }
  ) {
    return await this.prisma.avaliacoesProduto.create({
      data: {
        usuarioId: dados.usuarioId,
        productId: dados.productId,
        nota: dados.nota,
        comentario: dados.comentario,
      },
    });
  }
  //lista todas avaliacoes
  @Get()
  async listarAvaliacoes() {
    return await this.prisma.avaliacoesProduto.findMany({
      include: {
        usuario: {select: {nome: true,},},
        produto: {select: {id: true, name: true,},},
      },
    });
  }

  @Get(':id')
  async buscarAvaliacao(@Param('id') id: string) {
    return await this.prisma.avaliacoesProduto.findUnique({
      where: { id: Number(id), },
      include: {
        usuario: {select: { nome: true, },},
        produto: {select: {id: true,name: true,
          },
        },
      },
    });
  }

   @Patch(':id')
    async atualizarAvaliacao(
    @Param('id') id: string,
    @Body()
    dados: {
      nota?: number;
      comentario?: string;
    },
  ) {
    return await this.prisma.avaliacoesProduto.update({
      where: { id: Number(id), },
      data: {
        nota: dados.nota,
        comentario: dados.comentario,
      },
    });
  }

  @Delete(':id')
  async deletarAvaliacao(@Param('id') id: string) {
    return await this.prisma.avaliacoesProduto.delete({
      where: {id: Number(id),},
    });
  }

}

