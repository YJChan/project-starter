import { PrimaryGeneratedColumn, Entity, UpdateDateColumn, CreateDateColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { PermissionEntity } from "../permission/permission.entity";
import { UserAuthEntity } from "../user-auth/user-auth.entity";

@Entity("tbl_role")
export class RoleEntity{
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @CreateDateColumn() 
  createdDate: Date;

  @UpdateDateColumn() 
  updatedDate: Date;

  @Column({type: 'varchar', length: 100, unique: true})
  name: string;

  @Column('int')
  level: number;

  @Column({type: 'tinyint', default: 1 })
  status: boolean;

  @Column('varchar', {length: 255})
  description: string;

  @OneToMany(type => PermissionEntity, permission => permission.role)
  permissions: PermissionEntity[];

  @OneToMany(type => UserAuthEntity, userAuth => userAuth.role)
  userAuth: UserAuthEntity;
}