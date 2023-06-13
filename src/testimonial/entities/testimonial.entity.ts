import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Testimonial{
   @PrimaryGeneratedColumn('uuid')
   id:string
   @Index()
   @Column({default:null})
   Review:number
   @Index()
   @Column({default:null})
   Description:string
   @Index()
   @Column({default:null})
   FullName:string
   @Index()
   @Column({default:null})
   imageurl:string
   @Index()
   @Column({default:null})
   Designation:string
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   public created_at: Date;
   @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   public updated_at: Date;
}