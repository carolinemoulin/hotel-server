import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
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

  async create(categoryDto : CategoryDto): Promise<Category> {
    const insertResult = await this.categoryRepository.insert(categoryDto);
    const insertedId = insertResult.identifiers [0];
    return this.categoryRepository.findOne(insertedId);
  }

}