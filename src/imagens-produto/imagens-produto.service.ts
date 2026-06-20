import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateImagensProdutoDto } from './dto/create-imagens-produto.dto';

@Injectable()
export class ImagensProdutoService {
  constructor(private prisma: PrismaService) {}

  //salva o lote de imagens no banco de uma vez só
  async createMany(dto: CreateImagensProdutoDto) {
    const dadosParaInserir = dto.imagens.map((img) => ({
      produtoId: dto.produtoId,
      imageUrl: img.imageUrl,
      ordem: img.ordem,
    }));

    return this.prisma.imagensProdutos.createMany({
      data: dadosParaInserir,
    });
  }

  //busca as imagens de um produto especifico ordenadas 1-2-3-4
  async findByProduto(produtoId: number) {
    return this.prisma.imagensProdutos.findMany({
      where: { produtoId },
      orderBy: { ordem: 'asc' },
    });
  }

  // deleta todas as fotos por id
  async removeByProduto(produtoId: number) {
    return this.prisma.imagensProdutos.deleteMany({
      where: { produtoId },
    });
  }
}