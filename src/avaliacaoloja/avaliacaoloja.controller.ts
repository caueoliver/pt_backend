import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('avaliacoes-loja')
export class AvaliacoesLojaController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async criarAvaliacao(
    @Body() dados: { usuarioId: number; lojaId: number; nota: number; comentario?: string }
  ) {
    return await this.prisma.avaliacoesLoja.create({
      data: {
        usuarioId: dados.usuarioId,
        lojaId: dados.lojaId,
        nota: dados.nota,
        comentario: dados.comentario,
      },
    });
  }

  @Get()
  async listarAvaliacoes() {
    return await this.prisma.avaliacoesLoja.findMany({
      include: {
        usuario: { select: { nome: true, profile_picture_url: true } },
        loja: { select: { nome: true } },
        comentariosAvaliacoesLoja: {
          include: {
            usuario: { select: { nome: true, profile_picture_url: true } },
          },
        },
      },
    });
  }

  @Patch(':id')
  async atualizarAvaliacao(
    @Param('id') id: string,
    @Body() dados: { nota?: number; comentario?: string }
  ) {
    return await this.prisma.avaliacoesLoja.update({
      where: { id: Number(id) },
      data: {
        nota: dados.nota,
        comentario: dados.comentario,
      },
    });
  }

  @Delete(':id')
  async deletarAvaliacao(@Param('id') id: string) {
    return await this.prisma.avaliacoesLoja.delete({
      where: { id: Number(id) },
    });
  }
}

@Controller('comentarios-avaliacao-loja')
export class ComentariosAvaliacaoLojaController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async criarComentario(
    @Body() dados: { usuarioId: number; avaliacaoLojaId: number; conteudo: string }
  ) {
    return await this.prisma.comentariosAvaliacoesLoja.create({
      data: {
        usuarioId: dados.usuarioId,
        avaliacoesLojaId: dados.avaliacaoLojaId,
        conteudo: dados.conteudo,
      },
      include: {
        usuario: { select: { nome: true, profile_picture_url: true } },
      },
    });
  }

  @Patch(':id')
  async atualizarComentario(
    @Param('id') id: string,
    @Body() dados: { conteudo: string }
  ) {
    return await this.prisma.comentariosAvaliacoesLoja.update({
      where: { id: Number(id) },
      data: { conteudo: dados.conteudo },
    });
  }

  @Delete(':id')
  async deletarComentario(@Param('id') id: string) {
    return await this.prisma.comentariosAvaliacoesLoja.delete({
      where: { id: Number(id) },
    });
  }
}
