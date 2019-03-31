import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeTypeEntity } from './code-type.entity';
import { CodeTypeController } from './code-type.controller';
import { CodeTypeService } from './code-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([CodeTypeEntity])],
  controllers: [CodeTypeController],
  providers: [CodeTypeService],
  exports: [CodeTypeService]
})
export class CodeTypeModule {}
