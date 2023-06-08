
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Contact{
   @PrimaryColumn()
   contactid:string
   @Column({default:null})
   Category:string
   @Column({default:null})
   Name:string
   @Column({default:null})
   Email:string
   @Column({default:null})
   Attachment:string
   @Column({default:null})
   Description:string
   @Column({default:null})
   imagelink:string
   @CreateDateColumn()
   CreatedAt:string
   @UpdateDateColumn()
   UpdatedAt:string
}