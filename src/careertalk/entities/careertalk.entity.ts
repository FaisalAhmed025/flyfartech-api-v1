import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Careertalk {
   @PrimaryGeneratedColumn('uuid')
   id:string
   @Column()
   FullName:string
   @Column()
   Title:string
   @Column()
   Description:string
   @Column()
   imageurl:string   
}
