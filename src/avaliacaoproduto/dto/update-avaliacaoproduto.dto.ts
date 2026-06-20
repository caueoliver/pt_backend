import { PartialType } from '@nestjs/mapped-types';
import { CreateAvaliacaoprodutoDto } from './create-avaliacaoproduto.dto';

export class UpdateAvaliacaoprodutoDto extends PartialType(CreateAvaliacaoprodutoDto) {}
