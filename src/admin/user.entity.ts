

import { IsEmail, Matches } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ length: 50, unique: true })
  @IsEmail()
  email: string;

  @Column()
   @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/, { message: ' Invalid Password' })
  password: string;

  @Column({
    type: 'enum',
    enum: ['learner', 'instructor'],
    default: 'learner',
  })
  role: 'learner' | 'instructor';

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: true })
  isVerified: boolean;
}