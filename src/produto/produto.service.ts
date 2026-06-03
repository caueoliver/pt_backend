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
    return this.prisma.produtos.findMany();
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

  async findMaisBaratos(){
    //retorna os 10 primeiros produtos ordenados pelo preço de forma crescente
    return this.prisma.produtos.findMany({
      take: 10,
      orderBy:{
        preco: "asc",
      },
      //inclui o nome e o icone da loja 
      include:{
        lojas:{select:{nome: true, logoUrl: true}},
        imagensProdutos: {take: 1,
            select: { imageUrl: true }
        },
      },
    });
  }

  async findMelhoresAvaliados() {
    //retorna todos os produtos mas inclui os campos: loja(nome, logo), imagensProduto, avaliacoes(rating)
    const produtos = await this.prisma.produtos.findMany({
      include: {
        lojas: {
          select: {nome:true, logoUrl: true},
        },
        imagensProdutos: {take: 1,
          select: { imageUrl: true }
        },
        avaliacoesProduto: {
          select: {rating: true},
        }
      }
    });

    //percorre o vetor resultante para retornar apenas produtos em que é possível calcular a média
    const produtosComMedia = produtos.map((produto)=>{
      
      const avaliacoes = produto.avaliacoesProduto;
      //soma o rating de todas as avaliações do produto atual
      const soma = avaliacoes.reduce((acumulador, atual) => acumulador + atual.rating, 0);
      //calcula a média para o produto atual caso o vetor de avaliações não seja vazio
      const media = avaliacoes.length > 0 ? soma/avaliacoes.length : 0;

      //retira as avalições para que elas não sejam retornadas junto com os outros atributos
      const { avaliacoesProduto, ...produtoLimpo} = produto;

      //retorna os atributos principais de produto e a média das avaliações
      return{
        ...produtoLimpo,
        avaliacaoMedia: Number(media.toFixed(1))
      };
    });
    //retorna produtos em que se pode calcular a média
    return produtosComMedia
      .sort((a, b) => b.avaliacaoMedia - a.avaliacaoMedia) // ordena pela média
      .slice(0, 10) // pega os 10 primeiros
      .map((produto) => {
        // retira a média 
        const { avaliacaoMedia, ...produtoSemMedia } = produto; 
        
        // retorna só os atributos necessários
        return produtoSemMedia;
      });
    }
  

  async findRecentes() {
    //pega os 10 primeiros ordenados pela ordem de criação
    return this.prisma.produtos.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      //inclui o nome e o icone da loja 
      include: {
        lojas: {select: { nome: true, logoUrl: true },},
        imagensProdutos: {take: 1,
          select: { imageUrl: true }
        },
      },
    });
  }
}