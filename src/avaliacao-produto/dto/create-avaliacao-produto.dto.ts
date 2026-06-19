import { IsNumber, IsString, IsOptional } from 'class-validator';
export class CreateAvaliacaoProdutoDto {
  @IsNumber()  
  usuarioId!: number;
  @IsNumber()
  productId!: number;
  @IsNumber()
  nota!: number;
  @IsString()
  @IsOptional()
  comentario?: string;
}