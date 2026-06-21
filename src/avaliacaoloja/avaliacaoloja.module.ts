import { Module } from '@nestjs/common';
import { AvaliacaolojaService } from './avaliacaoloja.service';
import { AvaliacoesLojaController, ComentariosAvaliacaoLojaController } from './avaliacaoloja.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AvaliacoesLojaController, ComentariosAvaliacaoLojaController],
  providers: [AvaliacaolojaService, PrismaService],
})
export class AvaliacaolojaModule {}