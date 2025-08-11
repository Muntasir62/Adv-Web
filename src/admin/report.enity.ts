

import { MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reports')
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reportedUserId: number;

  @Column({ nullable: true })
  reportedCourseId?: number;

  @Column()
  @MinLength(10)
  description: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'resolved', 'dismissed'],
    default: 'pending',
  })
  status: 'pending' | 'resolved' | 'dismissed';
}