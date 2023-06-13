import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Careertalk {
   @PrimaryGeneratedColumn('uuid')
   id:string
   @Index() 
   @Column()
   FullName:string
   @Index() 
   @Column()
   Title:string
   @Index() 
   @Column()
   Description:string
   @Index() 
   @Column()
   imageurl:string   
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   public created_at: Date;
   @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   public updated_at: Date;
}
