import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

const crypto = require('crypto');
const secretKey = 'my-secret-key';
const maxValue = 10000;

@Entity()
export class Produtcs{
   @PrimaryGeneratedColumn('uuid')
   productid:string
   @BeforeInsert()
   async generateUniqueRandomNumber() {
     const timestamp = new Date().toISOString();
     const data = `${timestamp}-${secretKey}`;
     const hash = crypto.createHash('sha256').update(data).digest('hex');
     const randomNumber = parseInt(hash, 16) % maxValue;
     this.productid = `FFLU${randomNumber.toString().padStart(4, '0')}`;
   }

   @Column({default:null})
   Country:string
   @Column({default:null})
   Title:string
   @Column({default:null})
   Tag:string
   @Column({default:null})
   Projectlink:string
   @Column({default:null})
   Description:string
   @Column({default:null})
   imagelink:string

}