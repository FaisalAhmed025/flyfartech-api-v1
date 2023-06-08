import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Services{
   @PrimaryColumn()
   serviceid:string
   @Column({default:null})
   Name:string 
   @Column({default:null})
   imageurl:string
   @Column({default:null})
   TextField:string
   @Column({default:null})
   CustomerCount:string
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   public created_at: Date;
   @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   public updated_at: Date;
}