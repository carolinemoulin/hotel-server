import { IsNotEmpty, IsString, IsAlpha, MaxLength, IsNumber, IsOptional, IsAlphanumeric } from 'class-validator';
import { CategoryData } from './category.entity';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  persons: number;

  @IsOptional()
  data: CategoryData;

  get rooms(): string[] {
    return this.data?.rooms || [] ; // si data est undefined rooms renvoie un tableau vide
  }
}