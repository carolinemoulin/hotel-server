import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { AvailabilityResultDto } from 'src/shared/reservations/availability-result.dto';
import { ReservationsService, Stay } from './../shared/reservations/reservations.service';

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
}
