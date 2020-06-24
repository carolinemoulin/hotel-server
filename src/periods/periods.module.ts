import { Module } from '@nestjs/common';
import { PeriodsController } from './periods.controller';
import { PeriodsService } from './periods.service';
import { Period } from './period.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Period])],
  controllers: [PeriodsController],
  providers: [PeriodsService]
})
export class PeriodsModule {}
