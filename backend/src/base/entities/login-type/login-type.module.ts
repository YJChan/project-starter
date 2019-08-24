import { Module } from '@nestjs/common';
import { LoginTypeController } from './login-type.controller';
import { LoginTypeService } from './login-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginTypeEntity } from './login-type.entity';
import { UserAuthModule } from '../user-auth/user-auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([LoginTypeEntity]), UserAuthModule],
  controllers: [LoginTypeController],
  providers: [LoginTypeService],
  exports: [LoginTypeService],
})
export class LoginTypeModule {}
