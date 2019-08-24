import { Module, forwardRef } from '@nestjs/common';
import { UserAuthEntity } from './user-auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserAuthEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secretOrPrivateKey: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRY,
      },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, JwtStrategy],
  exports: [PassportModule, UserAuthService, JwtStrategy],
})
export class UserAuthModule {}
