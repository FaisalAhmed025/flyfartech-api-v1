import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Carreerpage {
   @PrimaryGeneratedColumn('uuid')
   id:string
   @Index() 
   @Column()
   coverimage1:string
   @Index() 
   @Column()
   coverimage2:string
}
