import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Employee {
   @PrimaryGeneratedColumn()
   id:number
   @Column({default:null})
   FullName:string
   @Column({default:null})
   Designation:string
   @Column({default:null})
   imageurl:string
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   public created_at: Date;
   @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   public updated_at: Date;

}
