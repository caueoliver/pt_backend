import { Module } from '@nestjs/common';
import { ImagensProdutoService } from './imagens-produto.service';
import { ImagensProdutoController } from './imagens-produto.controller';

@Module({
  controllers: [ImagensProdutoController],
  providers: [ImagensProdutoService],
})
export class ImagensProdutoModule {}
