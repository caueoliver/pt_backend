import { Injectable } from '@nestjs/common';
import { CreateAvaliacaoProdutoDto } from './dto/create-avaliacao-produto.dto';
import { UpdateAvaliacaoProdutoDto } from './dto/update-avaliacao-produto.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AvaliacaoProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dados: CreateAvaliacaoProdutoDto) {
    return await this.prisma.avaliacoesProduto.create({
      data: {
        usuarioId: dados.usuarioId,
        productId: dados.productId,
        nota: dados.nota,
        comentario: dados.comentario,
      },
    });
  }

  async findAll() {
    return await this.prisma.avaliacoesProduto.findMany({
      include: {
        usuario: { select: { nome: true } },
        produto: { select: { id: true, name: true } },
        comentariosAvaliacoes: {
          include: {
            usuario: { select: {nome:true} }
          }
        }
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.avaliacoesProduto.findUnique({
      where: { id },
      include: {
        usuario: { select: { nome: true } },
        produto: { select: { id: true, name: true } },
        comentariosAvaliacoes: {
          include: {
            usuario: { select: {nome:true} }
          }
        }
      },
    });
  }

  async update(id: number, dados: UpdateAvaliacaoProdutoDto) {
    return await this.prisma.avaliacoesProduto.update({
      where: { id },
      data: {
        nota: dados.nota,
        comentario: dados.comentario,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.avaliacoesProduto.delete({
      where: { id },
    });
  }

  async findByProduto(productId: number) {
  return this.prisma.avaliacoesProduto.findMany({
    where: { productId }, 
    include: {
      usuario: {
        select: { 
          name: true, 
          profile_picture_url: true  
        }
      }
    }
  });
}
}