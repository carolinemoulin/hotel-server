import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Category } from 'src/shared/categories/category.entity';

export class ReservationCustomerData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: {
    street: string;
    zipcode: string;
    city: string;
    country: string;
  };
}

export class ReservationData {
  nights: number;
  price: number;
  persons: number;
  customer: ReservationCustomerData;
}

@Entity()
export class Reservation {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id'})
  categoryId: number;

  @ManyToOne(type => Category) // jointure avec la table catégorie
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({name: 'start_date', type: 'date'})
  startDate: string; //'202-06-24'

  @Column({name: 'end_date', type: 'date'})
  endDate: string; //'202-06-24'

  @Column()
  code: string;

  @Column({type: 'jsonb'})
  data: ReservationData;
}