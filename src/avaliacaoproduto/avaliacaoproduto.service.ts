import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAvaliacaoprodutoDto } from './dto/create-avaliacaoproduto.dto';
import { UpdateAvaliacaoprodutoDto } from './dto/update-avaliacaoproduto.dto';

@Injectable()
export class AvaliacaoprodutoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAvaliacaoprodutoDto) {
    return await this.prisma.avaliacoesProduto.create({
      data: data,
    });
  }

  // --- CORREÇÕES FEITAS AQUI ---
  async findByProduto(productId: number) { // <-- Alterado para productId
    return await this.prisma.avaliacoesProduto.findMany({
      where: { productId: productId }, // <-- Alterado para productId
      include: {
        usuario: { 
          // Removi o avatarUrl para não dar erro. 
          // Se tiver foto no banco, adicione o nome correto da coluna!
          select: { name: true } 
        }
      }
    });
  }

  async findAll() {
    return await this.prisma.avaliacoesProduto.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.avaliacoesProduto.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateAvaliacaoprodutoDto) {
    return await this.prisma.avaliacoesProduto.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.avaliacoesProduto.delete({
      where: { id },
    });
  }
}