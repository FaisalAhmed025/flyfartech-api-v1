import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Testimonial{
   @PrimaryGeneratedColumn()
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
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   public created_at: Date;
   @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   public updated_at: Date;
}