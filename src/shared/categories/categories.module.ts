import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [CategoriesService],
  providers: [CategoriesService]
})
export class CategoriesModule {}
