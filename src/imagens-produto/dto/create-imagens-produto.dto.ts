import { IsNumber, IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ImagemItem {
  @IsString()
  imageUrl!: string;

  @IsNumber()
  ordem!: number; 
}

export class CreateImagensProdutoDto {
  @IsNumber()
  produtoId!: number; 

  @IsArray()
  @ValidateNested({ each: true }) // avisa o NestJS para validar dentro do array
  @Type(() => ImagemItem)         // converte cada item para a classe ImagemItem
  imagens!: ImagemItem[]; 
}