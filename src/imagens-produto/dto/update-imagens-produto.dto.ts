import { PartialType } from '@nestjs/mapped-types';
import { CreateImagensProdutoDto } from './create-imagens-produto.dto';

export class UpdateImagensProdutoDto extends PartialType(CreateImagensProdutoDto) {}
