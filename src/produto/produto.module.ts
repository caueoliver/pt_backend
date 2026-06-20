import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { PrismaModule} from 'prisma/prisma.module';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService, PrismaModule],
})
export class ProdutoModule {} 