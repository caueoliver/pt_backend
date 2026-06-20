import { Module } from '@nestjs/common';
import { AvaliacaoprodutoService } from './avaliacaoproduto.service';
import { AvaliacaoprodutoController } from './avaliacaoproduto.controller';
import { PrismaService } from '../prisma.service'; // <-- O CAMINHO CORRETO AQUI!

@Module({
  controllers: [AvaliacaoprodutoController],
  providers: [AvaliacaoprodutoService, PrismaService], 
})
export class AvaliacaoprodutoModule {}