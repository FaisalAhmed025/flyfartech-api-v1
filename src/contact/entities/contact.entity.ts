
import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Contact{
   @PrimaryGeneratedColumn()
   id:number
   @Index() 
   @Column({default:null})
   Category:string
   @Index() 
   @Column({default:null})
   Name:string
   @Index() 
   @Column({default:null})
   Email:string
   @Index() 
   @Column({default:null})
   Attachment:string
   @Index() 
   @Column({default:null})
   Description:string
   @Index() 
   @Column({default:null})
   imagelink:string
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   public created_at: Date;
   @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   public updated_at: Date;
}