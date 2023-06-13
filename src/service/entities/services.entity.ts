import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Services{
   @PrimaryGeneratedColumn()
   id:number;
   @Index()
   @Column({default:null})
   Name:string 
   @Index()
   @Column({default:null})
   imageurl:string
   @Index()
   @Column({default:null})
   TextField:string
   @Index()
   @Column({default:null})
   @Index()
   CustomerCount:string
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   public created_at: Date;
   @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   public updated_at: Date;
}