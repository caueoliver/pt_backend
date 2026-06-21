import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Ajuste o caminho conforme seu projeto

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, parentCategoryId?: number) {
    return await this.prisma.categorias.create({
      data: { name, parentCategoryId },
    });
  }


  async findAllFormatadas() {
    const categoriasDb = await this.prisma.categorias.findMany();
    
    // formata para a interface do front
    return categoriasDb.map((categoria) => ({
      id: categoria.id,
      nome: categoria.name, 
      icone: "", 
    }));
  }

  async findAll() {
    return await this.prisma.categorias.findMany({
      include: { subCategories: true },
    });
  }

  async update(id: number, name: string) {
    return await this.prisma.categorias.update({
      where: { id },
      data: { name },
    });
  }

  async delete(id: number) {
    return await this.prisma.categorias.delete({
      where: { id },
    });
  }
}