import { CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_login_type')
export class LoginTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {length: 100})
  name: string;

  @Column('text', {nullable: true})
  params: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column('varchar', {length: 40})
  createdBy: string;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column('varchar', {length: 40})
  updatedBy: string;
}
