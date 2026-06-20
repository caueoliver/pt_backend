import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';

@Injectable()
export class LojaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateLojaDto) {
    return this.prisma.lojas.create({ data });
  }

  async findAll() {
    return this.prisma.lojas.findMany();
  }

  async findOne(id: number) {
    // busca a loja e inclui os dados relacionados necessários
    const lojaDb = await this.prisma.lojas.findUnique({ 
      where: { id },
      include: {
        usuario: {
          select: { nome: true } // traz o nome do dono
        },
        avaliacoesLoja: {
          select: { nota: true } // traz as notas para calcular a média
        }
      }
    });

    if (!lojaDb) {
      throw new NotFoundException('Loja não encontrada');
    }

    // calcula a média de avaliações da loja
    const totalAvaliacoes = lojaDb.avaliacoesLoja.length;
    const somaNotas = lojaDb.avaliacoesLoja.reduce((acc, curr) => acc + curr.nota, 0);
    const avaliacaoMedia = totalAvaliacoes > 0 ? somaNotas / totalAvaliacoes : 0;

    // retorna a loja formatada
    return {
      id: lojaDb.id,
      nome: lojaDb.nome,
      categoria: lojaDb.categoria, 
      idDono: lojaDb.usuarioId,
      nomeDono: lojaDb.usuario.nome,
      logoUrl: lojaDb.logoUrl,
      bannerUrl: lojaDb.bannerUrl,
      avaliacaoMedia: avaliacaoMedia,
    };
  }

  async update(id: number, data: UpdateLojaDto) {
    const loja = await this.prisma.lojas.findUnique({ where: { id } });
    if (!loja) {
      throw new NotFoundException('Loja não encontrada');
    }
    return this.prisma.lojas.update({ data, where: { id } });
  }

  async delete(id: number) {
    const loja = await this.prisma.lojas.findUnique({ where: { id } });
    if (!loja) {
      throw new NotFoundException('Loja não encontrada');
    }
    return this.prisma.lojas.delete({ where: { id } });
  }

  async getReviewsByLoja(lojaId: number) {
    // busca as avaliações no banco
    const reviewsDb = await this.prisma.avaliacoesLoja.findMany({
      where: { lojaId },
      include: {
        // inclui os dados do usuário que fez a avaliação
        usuario: {
          select: {
            id: true,
            nome: true,
            profile_picture_url: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }, // traz os mais recentes primeiro
    });

    // mapeia o resultado do prisma para retornar o que está definido na interface do front end
    return reviewsDb.map((review) => ({
      id: review.id,
      usuarioId: review.usuario.id,
      nomeUsuario: review.usuario.nome,
      avatarUrl: review.usuario.profile_picture_url || "", // garante que retorne alguma coisa
      nota: review.nota,
      comentario: review.comentario || "",
    }));
  } 

  async getProdutosByLoja(lojaId: number) {
    // busca os produtos e as relações necessárias no banco
    const produtosDb = await this.prisma.produtos.findMany({
      where: { lojaId },
      include: {
        // puxa apenas a primeira imagem
        imagens: {
          orderBy: { ordem: 'asc' },
          take: 1, 
        },
        //puxa apenas as notas para calcular a média dps
        avaliacoesProduto: {
          select: { nota: true },
        },
      },
  
    });

    // mapeia e formata os dados
    return produtosDb.map((produto) => {
      // calcula a média de avaliações do produto
      const totalAvaliacoes = produto.avaliacoesProduto.length;
      const somaNotas = produto.avaliacoesProduto.reduce((acc, curr) => acc + curr.nota, 0);
      const avaliacaoMedia = totalAvaliacoes > 0 ? somaNotas / totalAvaliacoes : 0;

      return {
        id: produto.id,
        name: produto.name,
        preco: produto.preco,
        idLoja: produto.lojaId,
        avaliacao: avaliacaoMedia, // média calculada 
        description: produto.description || "",
        estoque: produto.estoque,
        // pega a url da primeira imagem, ou uma string vazia se não tiver foto
        imagemUrl: produto.imagens.length > 0 ? produto.imagens[0].imageUrl : "",
      };
    });
  }

}