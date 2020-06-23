import { Controller, Get, Post, ParseIntPipe, Param, Body } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';
import { create } from 'domain';
import { CategoryDto } from './category.dto';

@Controller('admin/categories')
export class CategoriesController {

  constructor(private categorydb: CategoriesService) {
    this.categorydb = categorydb;
  }

  @Get()
  readAll(): Promise<Category[]>{
    return this.categorydb.readAll();
  }

  @Get(':id')
  readOne(@Param('id', ParseIntPipe) id: number) {
    return this.categorydb.readOne(+id);
  }

  @Post()
  create(@Body() categoryDto: CategoryDto): Promise<Category> {
    return this.categorydb.create(categoryDto);
  }
}