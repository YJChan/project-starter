import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany } from 'typeorm';
import { CodeEntity } from '../code/code.entity';

@Entity('tbl_code_type')
export class CodeTypeEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {length: 100})
  type: string;

  @Column('varchar', {length: 255})
  desc: string;

  @Column('char', {length: 3})
  locale: string;

  @Column({type: 'tinyint', default: 1})
  status: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @Column('varchar', {length: 40})
  createdBy: string;

  @UpdateDateColumn()
  updatedDate: Date;
  
  @Column('varchar', {length: 40})
  updatedBy: string;

  @OneToMany(type => CodeEntity, codes => codes.codeType)
  codes: CodeEntity[];

}