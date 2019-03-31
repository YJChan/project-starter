import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, VersionColumn } from 'typeorm';
import { CodeTypeEntity } from '../code-type/code-type.entity';

@Entity('tbl_codes')
export class CodeEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('smallint')
  codeSeq: number;

  @Column('varchar', {length: 100})
  codeName: string;

  @Column('varchar', {length: 255})
  codeValue: string;

  @Column('varchar', {length: 255, nullable: true})
  codeDesc: string;

  @Column({type: 'tinyint', default: 1})
  status: boolean;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column('varchar', {length: 40, nullable: true})
  createdBy: string;

  @UpdateDateColumn()
  updatedDate: Date;
  
  @Column('varchar', {length: 40, nullable: true})
  updatedBy: string;

  @ManyToOne(type => CodeTypeEntity, codeType => codeType.codes, {
    cascade: true
  })
  codeType: CodeTypeEntity;
}