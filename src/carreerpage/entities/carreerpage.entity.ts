import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Carreerpage {
   @PrimaryGeneratedColumn('uuid')
   id:string
   @Column()
   coverimage1:string
   @Column()
   coverimage2:string
}
