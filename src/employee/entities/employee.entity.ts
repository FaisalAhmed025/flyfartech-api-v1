import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Employee {
   @PrimaryColumn()
   Employeeid:string
   @Column({default:null})
   FullName:string
   @Column({default:null})
   Designation:string
   @Column({default:null})
   imageurl:string
   @CreateDateColumn()
   CreatedAt:Date
   @UpdateDateColumn()
   UpdatedAt:Date

}
