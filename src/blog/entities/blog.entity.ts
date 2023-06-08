import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Blog{
   @PrimaryGeneratedColumn('uuid')
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
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   public created_at: Date;
   
   @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   public updated_at: Date;


}