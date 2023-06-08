import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

const crypto = require('crypto');
const secretKey = 'my-secret-key';
const maxValue = 10000;


@Entity()
export class Hero{
   @PrimaryColumn()
   heroid:string
   @Column({default:null})
   Design:string
   @Column({default:null})
   Code:string
   @Column({default:null})
   Build:string
   @Column({default:null})
   Deploy:string
}