import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Blog{
   @PrimaryGeneratedColumn()
   id:number
   @Index() 
   @Column({default:null})
   Category:string
   @Index() 
   @Column({default:null})
   Title:string
   @Index() 
   @Column({default:null})
   imageurl:string
   @Index() 
   @Column({default:null})
   WrittenBy:string
   @Index() 
   @Column({default:null})
   Designation:string
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   public created_at: Date;
   
   @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   public updated_at: Date;


}