import { Module } from '@nestjs/common';
import { CodeController } from './code.controller';
import { CodeService } from './code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeEntity } from './code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CodeEntity])],
  controllers: [CodeController],
  providers: [CodeService],
  exports: [CodeService]
})
export class CodeModule {}
