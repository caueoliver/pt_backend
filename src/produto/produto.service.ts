import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProdutoDto) {
    return this.prisma.produtos.create({ data });
  }

  async findAll() {
  return this.prisma.produtos.findMany({
    include: {
      categoria: { select: { name: true } },
      imagens: { take: 1, select: { imageUrl: true } },
    }
    });
  } 

  async update(id: number, data: UpdateProdutoDto) {
    const produto = await this.prisma.produtos.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return this.prisma.produtos.update({ data, where: { id } });
  }

  async delete(id: number) {
    const produto = await this.prisma.produtos.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return this.prisma.produtos.delete({ where: { id } });
  }

  async findOne(id: number) {
    const produto = await this.prisma.produtos.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  async findByUsuario(usuarioId: number) {
    const lojas = await this.prisma.lojas.findMany({ where: { usuarioId }, select: { id: true } });
    const lojaIds = lojas.map((l) => l.id);
    return this.prisma.produtos.findMany({
      where: { lojaId: { in: lojaIds } },
      include: { imagens: { take: 1, select: { imageUrl: true } } },
    });
  }

  async findMaisBaratos(){
    //retorna os 15 primeiros produtos ordenados pelo preço de forma crescente
    const produtos = await this.prisma.produtos.findMany({
      take: 15,
      orderBy: {
        preco: "asc",
      },
      // inclui o id da loja 
      include: {
        lojas: { select: { id: true} },
        imagens: { 
          take: 1,
          select: { imageUrl: true }
        },
      },
    });

    return produtos.map((p) => ({
      id: p.id,
      name: p.name,
      preco: p.preco,
      idLoja: p.lojaId,
      estoque: p.estoque,
      imagemUrl: p.imagens && p.imagens.length > 0 ? p.imagens[0].imageUrl : "",
    }));
  }

  async findMelhoresAvaliados() {
    //retorna todos os produtos mas inclui as avaliações para calcular os melhores avaliados
    const produtos = await this.prisma.produtos.findMany({
      include: {
        lojas: {
          select: {id:true},
        },
        imagens: {take: 1,
          select: { imageUrl: true }
        },
        avaliacoesProduto: {
          select: {nota: true},
        }
      }
    });

    // calcula a média, ordena, pega os 15 primeiros e formata
    return produtos
      .map((produto) => {
        const avaliacoes = produto.avaliacoesProduto;
        const soma = avaliacoes.reduce((acumulador, atual) => acumulador + atual.nota, 0);
        const media = avaliacoes.length > 0 ? soma / avaliacoes.length : 0;
        
        return { produtoOriginal: produto, media };
      })
      .sort((a, b) => b.media - a.media) // ordena pela média
      .slice(0, 15) // pega os 15 primeiros
      .map(({ produtoOriginal: p }) => ({
        // formata o produto bruto para a interface do front
        id: p.id,
        name: p.name,
        preco: p.preco,
        idLoja: p.lojaId,
        estoque: p.estoque,
        imagemUrl: p.imagens && p.imagens.length > 0 ? p.imagens[0].imageUrl : "",

      }));
    }
  

  async findRecentes() {
    // pega os 15 primeiros ordenados pela ordem de criação
    const produtos = await this.prisma.produtos.findMany({
      take: 15,
      orderBy: {
        createdAt: 'desc',
      },
      // inclui o nome e o icone da loja 
      include: {
        lojas: { select: { id: true, logoUrl: true } },
        imagens: { 
          take: 1,
          select: { imageUrl: true }
        },
      },
    });

    // formata para a interface do front
    return produtos.map((p) => ({
      id: p.id,
      name: p.name,
      preco: p.preco,
      idLoja: p.lojaId,
      estoque: p.estoque,
      imagemUrl: p.imagens && p.imagens.length > 0 ? p.imagens[0].imageUrl : ""
    }));
  }
}