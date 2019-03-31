import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";
import { RoleEntity } from "../role/role.entity";

@Entity("tbl_permission")
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @CreateDateColumn() 
  createdDate: Date;

  @UpdateDateColumn() 
  updatedDate: Date;

  @Column('varchar', {length: 100})
  name: string;

  @Column({type: 'varchar', length : 75})
  action: string;

  @Column({type:'varchar', length: 255})
  resource: string;

  @Column('varchar', {length: 255})
  description: string;

  @ManyToOne(type => RoleEntity, role => role.permissions, {
    cascade: true
  })
  role: RoleEntity;
}