import { Module } from '@nestjs/common';
import { LojaService } from './loja.service';
import { LojaController } from './loja.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [LojaController],
  providers: [LojaService, PrismaModule],
})
export class LojaModule {}