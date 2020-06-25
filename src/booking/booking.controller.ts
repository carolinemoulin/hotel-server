import { Controller, Get, Query, ParseIntPipe, Post, Body, Delete, Param } from '@nestjs/common';
import { AvailabilityResultDto } from 'src/shared/reservations/availability-result.dto';
import { ReservationsService, Stay } from './../shared/reservations/reservations.service';
import { Reservation } from 'src/shared/reservations/reservation.entity';
import { ReservationDto } from 'src/shared/reservations/reservation.dto';

@Controller('booking')
export class BookingController {

  constructor(private reservationsSrv: ReservationsService) {
    
  }

  @Get('available') // /booking/available?start=2020-07-03&end=2020-07-03&persons=2
  searchAvailable(@Query('start') startDate: string,
                  @Query('end') endDate: string,
                  @Query('persons', ParseIntPipe) persons: number): Promise<AvailabilityResultDto>{
  const stay: Stay = {startDate, endDate};
  return this.reservationsSrv.searchAvailable(stay, persons);
  }

  @Post('try-booking')// /booking/available?start=2020-07-03&end=2020-07-03&persons=2
  tryBooking(@Query('start') startDate: string,
            @Query('end') endDate: string,
            @Query('persons', ParseIntPipe) persons: number,
            @Query('category', ParseIntPipe) categoryId: number,
            @Body() reservationDto: ReservationDto): Promise<Reservation>{
    const stay: Stay = {startDate, endDate};
    return this.reservationsSrv.tryBooking(stay, persons, categoryId, reservationDto);
  }

  @Delete(':code')
    delete(@Param('code') code: string): Promise<Reservation> {
      return this.reservationsSrv.delete(code);
    }
}
