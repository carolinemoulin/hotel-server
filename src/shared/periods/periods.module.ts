import { Module } from '@nestjs/common';
import { Period } from './period.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodsService } from './periods.service';


@Module({
  imports: [TypeOrmModule.forFeature([Period])],
  providers: [PeriodsService],
  exports: [PeriodsService],
})
export class PeriodsModule {}
