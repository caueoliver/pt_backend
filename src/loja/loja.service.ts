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
    const loja = await this.prisma.lojas.findUnique({ where: { id } });
    if (!loja) {
      throw new NotFoundException('Loja não encontrada');
    }
    return loja;
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
}