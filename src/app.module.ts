import { Module } from '@nestjs/common';
import { CategoriesModule } from './shared/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './shared/categories/category.entity';
import { PeriodsModule } from './shared/periods/periods.module';
import { Period } from './shared/periods/period.entity';
import { AdminModule } from './admin/admin.module';

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
      entities: [Category, Period],
      synchronize: true,
    }),
    AdminModule
  ],
})
export class AppModule {}
