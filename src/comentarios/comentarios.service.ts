import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ComentariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dados: CreateComentarioDto) {
    return await this.prisma.comentariosAvaliacoes.create({
      data: {
        usuarioId: dados.usuarioId,
        avaliacaoProdutoId: dados.avaliacaoProdutoId,
        conteudo: dados.conteudo,
      },
    });
  }

  async findAll() {
    return await this.prisma.comentariosAvaliacoes.findMany({
      include: {
        usuario: { select: { nome: true } },
        avaliacaoProduto: { select: { id: true, comentario: true, nota: true } },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.comentariosAvaliacoes.findUnique({
      where: { id },
      include: {
        usuario: { select: { nome: true } },
      },
    });
  }

  async update(id: number, dados: UpdateComentarioDto) {
    return await this.prisma.comentariosAvaliacoes.update({
      where: { id },
      data: {
        conteudo: dados.conteudo,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.comentariosAvaliacoes.delete({
      where: { id },
    });
  }
}