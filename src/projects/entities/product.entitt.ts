import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Produtcs{
   @PrimaryColumn()
   projectid:string
   @Column({default:null})
   Country:string
   @Column({default:null})
   Title:string
   @Column({default:null})
   Tag:string
   @Column({default:null})
   Projectlink:string
   @Column({default:null})
   Description:string
   @Column({default:null})
   imagelink:string
   @CreateDateColumn()
   CreatedAt:string
   @UpdateDateColumn()
   UpdatedAt:string

}