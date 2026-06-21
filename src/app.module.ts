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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, UserModule, AuthModule, CategoriaModule, AvaliacaolojaModule, ProdutoModule,
    LojaModule,
    AvaliacaoProdutoModule,
    ComentariosModule,
    ImagensProdutoModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'), 
      serveRoot: '/uploads',
    }),],

    

  controllers: [AppController],
  providers: [AppService,
    /* {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }
  */
  ],
})
export class AppModule { }
