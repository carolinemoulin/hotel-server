import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({length: 50})
  name: string;

  @Column({length: 200, nullable: true})
  description: string;

  @Column()
  persons: number;
}