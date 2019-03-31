import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, OneToOne, BeforeInsert, OneToMany, ManyToOne } from 'typeorm';
import { RoleEntity } from '../role/role.entity';

@Entity('tbl_user_auth')
export class UserAuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('tinyint')
  loginType: number;

  @Column('varchar', {length : 100})
  loginName: string;

  @Column('varchar', {length : 250})
  password: string;

  @Column('varchar', {length: 50})
  salt: string;

  @Column('text')
  securityQuestion: string;

  @Column('text')
  securityAnswer: string;

  @Column('tinyint')
  attemptsMade: number;

  @Column('datetime')
  lastPasswordChangedDt: Date;

  @Column({type: 'varchar', length: 500, nullable: true})
  accessToken: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column('varchar', {length: 40})
  createdBy: string;

  @UpdateDateColumn()
  updatedDate: Date;
  
  @Column('varchar', {length: 40})
  updatedBy: string;

  @VersionColumn()
  version: number;

  @ManyToOne(type => RoleEntity, role => role.userAuth, {
    cascade: true
  })
  role: RoleEntity;
}