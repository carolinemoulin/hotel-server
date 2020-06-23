import { IsNotEmpty, IsString, IsAlpha, MaxLength, IsNumber, IsOptional } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsAlpha()
  @IsOptional()
  @MaxLength(50)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  persons: number;
}