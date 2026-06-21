import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateLojaDto {
  @IsInt()
  usuarioId!: number;

  @IsString()
  nome!: string;

  @IsString()
  categoria!: string;

  @IsString()
  @IsOptional()
  descricao?: string;
  
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsString()
  @IsOptional()
  bannerUrl!: string;

  @IsString()
  stickerUrl!: string;
}