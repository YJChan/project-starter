import {
    BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn,
} from 'typeorm';
import { RoleEntity } from '../role/role.entity';
import { UserEntity } from '../user/user.entity';
import { LoginTypeEntity } from '../login-type/login-type.entity';

@Entity('tbl_user_auth')
export class UserAuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => LoginTypeEntity, loginType => loginType.id)
  loginType: LoginTypeEntity;

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
    cascade: true,
  })
  role: RoleEntity;

  @ManyToOne(type => UserEntity, user => user.userAuth, {
    cascade: true,
  })
  user: UserEntity;
}
