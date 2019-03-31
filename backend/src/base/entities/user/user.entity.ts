import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, VersionColumn, OneToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { UserAuthEntity } from '../user-auth/user-auth.entity';

@Entity('tbl_user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @CreateDateColumn() 
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column('varchar', {length: 255})
  firstName: string;

  @Column('varchar', {length: 255})
  lastName: string;

  @Column({type:'varchar', length: 255, nullable: true})
  middleName: string;

  @Column('varchar', {length: 255})
  email: string;

  @Column({type: 'varchar', length: 25, nullable: true})
  phoneNum: string;

  @Column({type: 'tinyint', default: 1})
  status: boolean;
  
  @VersionColumn()
  version: number;

  @OneToOne(type => UserAuthEntity)
  @JoinColumn()
  userAuth: UserAuthEntity;

}