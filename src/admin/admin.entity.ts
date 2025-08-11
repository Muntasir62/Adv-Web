import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "./course.entity";

@Entity("admin")
export class AdminEntity
{
    @PrimaryGeneratedColumn()
    id : number;
    @Column({name : "fullname", type: "varchar"})
    name : string;
    @Column({ length: 50, unique: true})
    email : string;
    @Column({
        type : 'enum',
        enum : ['super_admin', 'moderator', 'analyst'],
        default : 'moderator',
    })
    accessLevel : 'super_admin' | 'moderator' | 'analyst'
    @Column()
    password : string;
    @OneToMany(() => CourseEntity, (course) => course.approvedBy)
    approvedCourses : CourseEntity[];

}
    
   // New
   /*@Entity('admin')
   export class NewAdmin
   {
    @PrimaryGeneratedColumn('increment', {type : 'int', unsigned : true})
    id: number;
    @Column({type : 'varchar', length : 100, nullable : false, name : 'name'})
    fullname: string;
    @Column({type : 'int', unsigned : true, nullable : false})
    age: number;
    @Column({
        type : 'enum',
        enum : ['active', 'inactive'],
        default : 'active',
    })
    status: 'active' | 'inactive'

   }
    */