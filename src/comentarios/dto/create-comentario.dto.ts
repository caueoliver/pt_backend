import { IsNumber, IsString } from 'class-validator';

export class CreateComentarioDto {
  @IsNumber()
  usuarioId!: number;

  @IsNumber()
  avaliacaoProdutoId!: number;

  @IsString()
  conteudo!: string;
}