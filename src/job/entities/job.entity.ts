import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Job {
   @PrimaryGeneratedColumn('uuid')
   jobid:string
   @Column()
   Title:string
   @Column()
   Description:string
   @Column({type:'date'})
   DueDate:Date
}
