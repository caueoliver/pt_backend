import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  // cria um novo comentário na avaliação do produto
  @Post()
  async criarComentario(@Body() dados: CreateComentarioDto) {
    return await this.comentariosService.create(dados);
  }

  // lista todos os comentários
  @Get()
  async listarComentarios() {
    return await this.comentariosService.findAll();
  }

  // busca um comentário específico
  @Get(':id')
  async buscarComentario(@Param('id', ParseIntPipe) id: number) {
    return await this.comentariosService.findOne(id);
  }

  // edita um comentário
  @Patch(':id')
  async atualizarComentario(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: UpdateComentarioDto,
  ) {
    return await this.comentariosService.update(id, dados);
  }

  // deleta um comentário
  @Delete(':id')
  async deletarComentario(@Param('id', ParseIntPipe) id: number) {
    return await this.comentariosService.remove(id);
  }
}