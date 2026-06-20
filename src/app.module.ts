import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CategoriaModule } from './categoria/categoria.module';
import { AvaliacaolojaModule } from './avaliacaoloja/avaliacaoloja.module';
import { AvaliacaoprodutoModule } from './avaliacaoproduto/avaliacaoproduto.module';

@Module({
  imports: [UserModule, UserModule, AuthModule, CategoriaModule, AvaliacaolojaModule, AvaliacaoprodutoModule],
  controllers: [AppController],
  providers: [AppService,
  //  {
    //  provide: APP_GUARD,
      //useClass: JwtAuthGuard,
    //}
  ],
})
export class AppModule {}
