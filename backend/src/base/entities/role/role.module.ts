import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UserAuthModule } from '../user-auth/user-auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]),
    forwardRef(() => UserAuthModule),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {

}
