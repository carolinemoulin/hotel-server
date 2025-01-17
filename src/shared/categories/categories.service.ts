import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
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
    await this.checkNoDuplicated(categoryDto.rooms);
    const insertResult = await this.categoryRepository.insert(categoryDto);
    const insertedId = insertResult.identifiers [0];
    return this.categoryRepository.findOne(insertedId);
  }

  /*Même fonction appelée différement
  create(categoryDto : CategoryDto): Promise<Category> {
    this.checkNoDuplicated(categoryDto.rooms);
    return this.categoryRepository.save(categoryDto);
  }*/

  async update(id: number,
    categoryDto: CategoryDto): Promise<void>{
      this.checkNoDuplicated(categoryDto.rooms,id);
    const result = await this.categoryRepository.update(id, categoryDto); 
    if (result.affected === 0) {
      throw new HttpException('Catégorie non trouvée', HttpStatus.NOT_FOUND)
    }
  }

  async delete(id:number): Promise<void>{
    const deleteResult : DeleteResult = await this.categoryRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new HttpException('Catégorie non trouvée', HttpStatus.NOT_FOUND)
    }
  }

  async checkNoDuplicated(newRooms: string[], ignoreId?: number): Promise<void> {
    const existingCategories: Category[] = await this.categoryRepository.find();
    const otherCategories = existingCategories.filter(cat => cat.id !=ignoreId);
    const allRooms: string [] = [ newRooms, ...otherCategories.map(cat => cat.rooms)].flat();
    //ex allRooms = ['101', '102', '201', '102']
    const occurrences: number[] = allRooms.map(room => allRooms.filter(r => r === room).length)
    //ex occurrences = [1, 2, 1, 2] 
    const hasDuplicated: boolean = occurrences.some(occ => occ > 1);
    if (hasDuplicated) {
      throw new HttpException('Les chambres en double ne sont pas autorisées', HttpStatus.CONFLICT);
    }
  }
}