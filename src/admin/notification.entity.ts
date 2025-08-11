

import { MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(3)
  title: string;

  @Column()
  @MinLength(10)
  message: string;

  @Column()
  recipient: string;

  @Column({ type: 'timestamp'  })
  timestamp: Date;
}