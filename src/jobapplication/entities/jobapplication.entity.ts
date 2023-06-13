import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class Jobapplication {
   @PrimaryGeneratedColumn()
   id:number

   @Column()
   Name:string

   @Column()
   Email:string

   @Column()
   Description:string
   @Column()
   cvattachmenturl:string
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   public created_at: Date;
   @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   public updated_at: Date;
}
