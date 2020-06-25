import { PeriodData } from "./period.entity";
import { IsNumber, IsISO8601, Allow } from "class-validator";

export class PeriodDto {

  @IsNumber()
  categoryId: number;

  @IsISO8601({strict: true}) // validateur date correcte
  startDate: string; //'202-06-24'

  @IsISO8601({strict: true}) 
  endDate: string; //'202-06-24'

  @Allow()
  data: PeriodData;
}