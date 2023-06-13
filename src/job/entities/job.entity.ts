import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Job {
   @PrimaryGeneratedColumn('uuid')
   jobid:string
   @Index() 
   @Column()
   Title:string
   @Index() 
   @Column()
   Description:string
   @Index() 
   @Column({type:'date'})
   DueDate:Date
}
