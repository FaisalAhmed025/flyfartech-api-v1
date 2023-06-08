import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Services{
   @PrimaryColumn()
   serviceid:string
   @Column({default:null})
   Name:string 
   @Column({default:null})
   imageurl:string
   @Column({default:null})
   TextField:string
   @Column({default:null})
   CustomerCount:string
   @CreateDateColumn()
   CreatedAt:string
   @UpdateDateColumn()
   UpdatedAt:string
}