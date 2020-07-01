import { Controller, Get, Post, ParseIntPipe, Param, Body, Put, HttpStatus, HttpCode, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { Category } from '../shared/categories/category.entity';
import { CategoriesService } from '../shared/categories/categories.service';
import { CategoryDto } from '../shared/categories/category.dto';

@Controller('admin/categories')
@UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true, transform: true}))
export class CategoriesController {

  constructor(private categorydb: CategoriesService) {
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

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id',ParseIntPipe) id: number,
          @Body() categoryDto : CategoryDto): Promise<void> {
            return this.categorydb.update(id,categoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id',ParseIntPipe) id: number): Promise<void> {
    return this.categorydb.delete(id);
  }
}