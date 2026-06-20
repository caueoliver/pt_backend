import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsInt()
  lojaId!: number;

  @IsInt()
  categoriaId!: number;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  preco!: number;

  @IsInt()
  @Min(0)
  estoque!: number;
}