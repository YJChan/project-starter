/*import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { use } from 'passport';
import { Strategy } from 'passport-local';

import { UserAuthEntity } from '../user-auth.entity';
import { UserAuthService } from '../user-auth.service';
import { generateSalt,generateHashedPassword } from '../../../../utilities/encryption';
import { UserAuthDTO, UserAuthRO, AuthenticateUserDTO } from '../dto/user-auth.dto';

@Injectable()
export class LocalStrategy {
  constructor(
    private userAuthService : UserAuthService,
    private userAuthEntity: UserAuthEntity
  ) {
    this.init();
  }

  private init(): void {
    use('local-signup', new Strategy({
      usernameField: 'loginName',
      passwordField: 'password'
    }, async (loginName: string, password: string, done: Function) => {
      try {
        if (await this.userAuthService.findOne(loginName)) {
          return done(new UnauthorizedException('Email is in use.'), false);
        }

        const salt: string = generateSalt();
        const userAuth: UserAuthEntity = new UserAuthEntity();
        userAuth.loginType = 1;
        userAuth.loginName = loginName;
        userAuth.password = password;
        userAuth.salt = salt;
        userAuth.securityQuestion = '';
        userAuth.securityAnswer = '';
        userAuth.updatedBy = 'ADMIN';        
        await this.userAuthService.saveOne(userAuth);

        done(null, userAuth);
      } catch (error) {
        done(error, false);
      }
    }));

    use('local-signin', new Strategy({
      usernameField: 'loginName',
      passwordField: 'password'
    }, async (loginName: string, password: string, done: Function) => {
      try {
        const user: UserAuthDTO = await this.userAuthService.findOne(loginName);

        if (!user) {
          return done(new UnauthorizedException('Login name is not authorized'), false);
        }

        if (generateHashedPassword(user.salt, password) !== user.password) {
          return done(new UnauthorizedException('Invalid password'), false);
        }

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }));
  }
}

*/