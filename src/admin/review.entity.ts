

import { Min, MinLength } from "class-validator";
import { Column, Entity, MinKey, PrimaryGeneratedColumn } from "typeorm";

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseId: number;

  @Column()
  userId: number;

  @Column()
  @Min(1)
  rating: number;

  @Column()
  @MinLength(5)
  comment: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;
}