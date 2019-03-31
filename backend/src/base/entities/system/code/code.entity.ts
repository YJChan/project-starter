import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { CodeTypeEntity } from '../code_type/code_type.entity';

@Entity('tbl_codes')
export class CodeEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('smallint')
  codeSeq: number;

  @Column('varchar', {length: 100})
  codeName: string;

  @Column('varchar', {length: 255})
  codeDesc: string;

  @Column({type: 'tinyint', default: 1})
  status: boolean;

  @Column('tinyint')
  version: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column('varchar', {length: 40})
  createdBy: string;

  @UpdateDateColumn()
  updatedDate: Date;
  
  @Column('varchar', {length: 40})
  updatedBy: string;

  @ManyToOne(type => CodeTypeEntity, codeType => codeType.codes, {
    cascade: true
  })
  codeType: CodeTypeEntity;
}