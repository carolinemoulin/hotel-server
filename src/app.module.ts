import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/category.entity';

@Module({
  imports: [
    CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'hotel',
      password: 'azerty',
      database: 'hoteldb',
      schema: 'hotel',
      entities: [Category],
      synchronize: true,
    })
  ],
})
export class AppModule {}
