import { Controller, Get, Post, Body, Delete, Put, Param, ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
import { LojaService } from './loja.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('loja')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Post()
  create(@Body() data: CreateLojaDto) {
    return this.lojaService.create(data);
  }

  @IsPublic()
  @Get('todos')
  async findAll() {
    return this.lojaService.findAll();
  }

  @IsPublic()
  @Get('usuario/:usuarioId')
  async findByUsuario(@Param('usuarioId') usuarioId: string) {
    return this.lojaService.findByUsuario(Number(usuarioId));
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.lojaService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateLojaDto) {
    return this.lojaService.update(Number(id), data);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.lojaService.delete(Number(id));
  }

  @IsPublic()
  @Get(':id/reviews')
  async getReviewsByLoja(@Param('id') id: string) {
    return this.lojaService.getReviewsByLoja(Number(id));
  }

  @IsPublic()
  @Get(':id/produtos')
  async getProdutosByLoja(@Param('id', ParseIntPipe) id: number) {
    return this.lojaService.getProdutosByLoja(id);
  }

  @IsPublic()
  @Get(':id/melhores')
  async getMelhoresByLoja(@Param('id', ParseIntPipe) id: number) {
    return this.lojaService.getProdutosByLoja(id);
  }


  @IsPublic()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/img_lojas', //coloca as imgs na pasta de uploads
      filename: (req, file, cb) => {
        // gera um nome único para evitar que imagens com o mesmo nome se sobrescrevam
        const nomeUnico = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extensao = extname(file.originalname);
        cb(null, `${nomeUnico}${extensao}`);
      }
    })
  }))
  async uploadImagem(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }
    // retorna a url
    return { url: `http://localhost:3001/uploads/img_lojas/${file.filename}` };
  }

}