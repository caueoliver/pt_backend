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
}