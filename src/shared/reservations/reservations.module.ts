import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  exports: [ReservationsService],
  providers: [ReservationsService]
})
export class ReservationsModule {}
