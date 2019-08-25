import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserAuthModule } from '../user-auth/user-auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => UserAuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
