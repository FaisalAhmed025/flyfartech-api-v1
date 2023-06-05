import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Services{
   @PrimaryGeneratedColumn()
   serviceid:string
   @Column({default:null})
   Name:string 
   @Column({default:null})
   imageurl:string
   @Column({default:null})
   TextField:string
   @Column({default:null})
   CustomerCount:string
}