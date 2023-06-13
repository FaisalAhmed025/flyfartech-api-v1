import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Produtcs{
   @PrimaryGeneratedColumn()
   id:number
   @Index()
   @Column({default:null})
   Country:string
   @Index()
   @Column({default:null})
   Title:string
   @Index()
   @Column({default:null})
   Tag:string
   @Index()
   @Column({default:null})
   Projectlink:string
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