import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from 'src/categories/category.entity';

@Entity()
export class Period {

  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(type => Category) // jointure avec la table catégorie
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'category_id '})
  categoryId: number;

  @Column({name: 'start_date', type: 'date'})
  startDate: string; //'202-06-24'

  @Column({name: 'end_date', type: 'date'})
  endDate: string; //'202-06-24'

}