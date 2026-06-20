import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ImagensProdutoService } from './imagens-produto.service';
import { CreateImagensProdutoDto } from './dto/create-imagens-produto.dto';

@Controller('imagens-produto')
export class ImagensProdutoController {
  constructor(private readonly imagensProdutoService: ImagensProdutoService) {}

  //salva as fotos
  @Post()
  create(@Body() createImagensProdutoDto: CreateImagensProdutoDto) {
    return this.imagensProdutoService.createMany(createImagensProdutoDto);
  }

  //pega as fotos pelo id do produto - imagens-produto/produto/1
  @Get('produto/:id')
  findByProduto(@Param('id') id: string) {
    return this.imagensProdutoService.findByProduto(+id);
  }

  // deleta as fotos pelo id do produto
  @Delete('produto/:id')
  removeByProduto(@Param('id') id: string) {
    return this.imagensProdutoService.removeByProduto(+id);
  }
}