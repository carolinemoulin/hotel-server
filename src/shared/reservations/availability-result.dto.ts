import { Category } from "../categories/category.entity";


export class AvailabilityResultDto {

  nights: number;
  list: Array<{
    category: Category;
    available: boolean;
    price: number;
  }>;
}