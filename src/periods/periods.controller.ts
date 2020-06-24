import { Controller, Get, ParseIntPipe, Param, Post, Put, Delete, HttpCode, HttpStatus, Body, Query } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PeriodDto } from './period.dto';
import { Period } from './period.entity';
import { ApiQuery } from '@nestjs/swagger';

@Controller('admin/periods')
export class PeriodsController {

  constructor(private periodsSrv: PeriodsService) {
    this.periodsSrv = periodsSrv;
  }

  @Get() // /admin/periods?/category=3&start=2020-06-24&end=2020-07-02
  @ApiQuery({name: 'category', required: false})
  @ApiQuery({name: 'start', required: false})
  @ApiQuery({name: 'end', required: false})
  searchAll(@Query('category') categoryId?: number,
            @Query('start') startDate?: string,
            @Query('end')endDate?: string ): Promise<Period[]>{
    return this.periodsSrv.searchAll({categoryId, startDate, endDate});
  }

  @Get(':id')
  readOne(@Param('id', ParseIntPipe) id: number) {
    return this.periodsSrv.readOne(+id);
  }

  @Post()
  create(@Body() periodDto: PeriodDto): Promise<Period> {
    return this.periodsSrv.create(periodDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id',ParseIntPipe) id: number,
          @Body() periodDto : PeriodDto): Promise<void> {
            return this.periodsSrv.update(id,periodDto);
  }

 /* @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id',ParseIntPipe) id: number): Promise<void> {
    return this.periodsSrv.delete(id);
  }*/
}
