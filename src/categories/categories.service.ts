import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) 
              private categoryRepository: Repository<Category>) {

  }

  readAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async readOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if(!category) {
      throw new HttpException ('Catégorie non trouvée', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  create(categoryDto : CategoryDto): Promise<Category> {
    return this.categoryRepository.save(categoryDto);
  }
  /* Même fonction appelée différement
    async create(categoryDto : CategoryDto): Promise<Category> {
    const insertResult = await this.categoryRepository.insert(categoryDto);
    const insertedId = insertResult.identifiers [0];
    return this.categoryRepository.findOne(insertedId);
  }*/

  async update(id: number,
    categoryDto: CategoryDto): Promise<void>{
    const result = await this.categoryRepository.update(id, categoryDto); 
    if (result.affected === 0) {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND)
    }
  }

  async delete(id:number): Promise<void>{
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND)
    }
  }
}