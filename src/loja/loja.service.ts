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

  
  async getProdutosByLoja(lojaId: number) {
    // busca os produtos filtrando pelo id da loja
    const produtosDb = await this.prisma.produtos.findMany({
      where: { lojaId },
      include: {
        lojas: { select: { id: true } }, 
        imagens: {
          take: 1, 
          select: { imageUrl: true },
        },
      },
      orderBy: {
        createdAt: 'desc', // traz os mais recentes primeiro
      }
    });

    // mapeia e formata os dados direto para a interface do front
    return produtosDb.map((produto) => ({
      id: produto.id,
      name: produto.name,
      preco: produto.preco,
      idLoja: produto.lojaId,
      estoque: produto.estoque,
      imagemUrl: produto.imagens && produto.imagens.length > 0 ? produto.imagens[0].imageUrl : "",
    }));
  }

  async getProdutosMelhoresByLoja(lojaId: number) {
    // busca os produtos específicos da loja, incluindo as avaliações
    const produtos = await this.prisma.produtos.findMany({
      where: { lojaId },
      include: {
        lojas: { select: { id: true } }, 
        imagens: { 
          take: 1,
          select: { imageUrl: true }
        },
        avaliacoesProduto: {
          select: { nota: true }, // idêntico ao findMelhoresAvaliados
        }
      }
    });

    // calcula a média, ordena, pega os primeiros e formata
    return produtos
      .map((produto) => {
        const avaliacoes = produto.avaliacoesProduto;
        const soma = avaliacoes.reduce((acumulador, atual) => acumulador + atual.nota, 0);
        const media = avaliacoes.length > 0 ? soma / avaliacoes.length : 0;
        
        return { produtoOriginal: produto, media };
      })
      .sort((a, b) => b.media - a.media) // ordena da maior média para a menor
      .slice(0, 15) // os 15 melhores produtos da loja 
      .map(({ produtoOriginal: p }) => ({
        // formata para a interface do front
        id: p.id,
        name: p.name,
        preco: p.preco,
        idLoja: p.lojaId,
        estoque: p.estoque,
        imagemUrl: p.imagens && p.imagens.length > 0 ? p.imagens[0].imageUrl : "",
      }));
      }

      async getReviewsByLoja(lojaId: number) {
    // busca as avaliações filtrando pela loja e inclui os dados do autor
    const reviewsDb = await this.prisma.avaliacoesLoja.findMany({
      where: { 
        lojaId: lojaId 
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            profile_picture_url: true, // puxa a foto do perfil
          }
        }
      },
      orderBy: { 
        createdAt: 'desc' // ordena para mostrar os comentários mais recentes primeiro
      },
    });

    // formata para a interface do front
    return reviewsDb.map((review) => ({
      id: review.id,
      usuarioId: review.usuario.id,
      nomeUsuario: review.usuario.nome,
      avatarUrl: review.usuario.profile_picture_url || "", 
      nota: review.nota,
      comentario: review.comentario || "",
    }));
  }
}