import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Period } from './period.entity';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PeriodDto } from './period.dto';

@Injectable()
export class PeriodsService {

  constructor(@InjectRepository(Period) 
              private periodRepository: Repository<Period>) {
  }

  async searchAll(options?: {startDate?: string, endDate: string, categoryId?: number, ignorePeriodId?: number}): Promise<Period[]> {
    let query = this.periodRepository.createQueryBuilder('period');
      if(options?.startDate) {
        query = query.andWhere('period.endDate >= :startDate', {startDate: options.startDate})
      }
      if(options?.endDate) {
        query = query.andWhere('period.startDate <= :endDate', {endDate: options.endDate})
      }
      if(options?.categoryId) {
        query = query.andWhere('period.categoryId = :catId', {catId: options.categoryId})
      }
    const allPeriods: Period[] = await query.getMany();
    return allPeriods.filter(period => !options?.ignorePeriodId || period.id !== options.ignorePeriodId);
  }

  async readOne(id: number): Promise<Period> {
    const period = await this.periodRepository.findOne(id);
    if(!period) {
      throw new HttpException ('Période non trouvée', HttpStatus.NOT_FOUND);
    }
    return period;
  }

  async create(periodDto : PeriodDto): Promise<Period> {
    const existingPeriods: Period[] = await this.searchAll({
      startDate: periodDto.startDate, 
      endDate: periodDto.endDate,
      categoryId: periodDto.categoryId
    });
    if(existingPeriods.length > 0) {
      throw new HttpException('Période déjà présente', HttpStatus.CONFLICT)
    }
    const insertResult = await this.periodRepository.insert(periodDto);
    const insertedId = insertResult.identifiers [0];
    return this.periodRepository.findOne(insertedId);
  }

  async update(id: number, periodDto: PeriodDto): Promise<void>{
      const existingPeriods: Period[] = await this.searchAll({
        startDate: periodDto.startDate, 
        endDate: periodDto.endDate,
        categoryId: periodDto.categoryId
      });
      if(existingPeriods.length > 0) {
        throw new HttpException('Période déjà présente', HttpStatus.CONFLICT)
      }
    const result = await this.periodRepository.update(id, periodDto); 
    if (result.affected === 0) {
      throw new HttpException('Période non trouvée', HttpStatus.NOT_FOUND)
    }
  }

  async delete(id:number): Promise<void>{
    const deleteResult : DeleteResult = await this.periodRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new HttpException('Période non trouvée', HttpStatus.NOT_FOUND)
    }
  }
}
