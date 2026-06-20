import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';

export class CreateAvaliacaoprodutoDto {
  @IsInt()
  productId: number; // <-- CORRIGIDO AQUI (com 'c')

  @IsInt()
  usuarioId: number; 

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  comment?: string;
}