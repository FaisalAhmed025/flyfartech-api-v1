import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

const crypto = require('crypto');
const secretKey = 'my-secret-key';
const maxValue = 10000;


@Entity()
export class Hero{
   @PrimaryGeneratedColumn('uuid')
   heroid:string
   @Column({default:null})
   Design:string
   @Column({default:null})
   Code:string
   @Column({default:null})
   Build:string
   @Column({default:null})
   Deploy:string
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   public created_at: Date;
   @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   public updated_at: Date;

   
}