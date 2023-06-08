import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Testimonial{
   @PrimaryColumn()
   id:string
   @Column({default:null})
   Review:number
   @Column({default:null})
   Description:string
   @Column({default:null})
   FullName:string
   @Column({default:null})
   imageurl:string
   @Column({default:null})
   Designation:string
   @CreateDateColumn()
   CreatedAt:string
   @UpdateDateColumn()
   UpdatedAt:string
}