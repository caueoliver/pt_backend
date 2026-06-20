import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ProdutoModule } from './produto/produto.module';
import { LojaModule } from './loja/loja.module';
import { CategoriaModule } from './categoria/categoria.module';
import { AvaliacaolojaModule } from './avaliacaoloja/avaliacaoloja.module';
import { AvaliacaoProdutoModule } from './avaliacao-produto/avaliacao-produto.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { ImagensProdutoModule } from './imagens-produto/imagens-produto.module';
// 1. ADICIONE A IMPORTAÇÃO AQUI (ajuste o caminho se a pasta prisma não estiver na raiz do src)
import { PrismaModule } from 'prisma/prisma.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    PrismaModule, // 2. ADICIONE O PRISMA AQUI
    UserModule,   // (Removi o UserModule duplicado que tinha aqui do lado)
    AuthModule, 
    CategoriaModule, 
    AvaliacaolojaModule, 
    ProdutoModule,
    LojaModule,
    AvaliacaoProdutoModule,
    ComentariosModule,
    ImagensProdutoModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /* {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }
  */
  ],
})
export class AppModule { }