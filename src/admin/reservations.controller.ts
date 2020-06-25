import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Reservation } from './../shared/reservations/reservation.entity';
import { ReservationsService } from './../shared/reservations/reservations.service';

@Controller('admin/reservations')
export class ReservationsController {

  constructor(private reservationsSrv: ReservationsService) {
    this.reservationsSrv = reservationsSrv;
  }

  @Get() // /admin/reservations?/category=3&start=2020-06-24&end=2020-07-02
  @ApiQuery({name: 'category', required: false})
  @ApiQuery({name: 'start', required: false})
  @ApiQuery({name: 'end', required: false})
  searchAll(@Query('category') categoryId?: number,
            @Query('start') startDate?: string,
            @Query('end')endDate?: string ): Promise<Reservation[]>{
    //return this.reservationsSrv.searchAll({categoryId, startDate, endDate});
    return null;
  }
}
