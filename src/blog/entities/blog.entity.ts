import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Blog{
   @PrimaryColumn()
   blogid:string
   @Column({default:null})
   Category:string
   @Column({default:null})
   Title:string
   @Column({default:null})
   imageurl:string
   @Column({default:null})
   WrittenBy:string
   @Column({default:null})
   Designation:string
   @CreateDateColumn()
   CreatedAt:string
   @UpdateDateColumn()
   UpdatedAt:string
}