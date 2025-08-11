import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdminEntity } from "./admin.entity";
import { timestamp } from "rxjs";

@Entity('courses')
export class CourseEntity
{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    title : string;
    @Column()
    description : string;
    @Column({default: 'pending'})
    status : 'pending' | 'approved' | 'rejected';
    @ManyToOne(() => AdminEntity, (admin) => admin.approvedCourses)
    approvedBy : AdminEntity;
    @Column({type : 'timestamp'})
    createdAt : Date;
    @Column({nullable : true })
    rejectionReason?: string;

 
}