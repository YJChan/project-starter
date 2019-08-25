import { Controller, Post, Req, Body, UsePipes } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { AuthenticateUserDTO, RegisterUserAuthDTO } from './dto/user-auth.dto';
import { Payload } from 'src/types/Payload';
import { Roles } from './decorator/role.decorator';
import { Permission } from './decorator/permission.decorator';
import { ValidationPipe } from '../../../shared/validation.pipe';

@Controller('api/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('sign-in')
  async requestJsonWebTokenAfterLocalSignIn(@Body() userAuthDTO: AuthenticateUserDTO) {
    let userAuth = await this.userAuthService.login(userAuthDTO);

    const accessToken = await this.userAuthService.generateAccessToken();

    const jwtPayload: Payload = {
      username: userAuth.loginName,
      role: userAuth.role.name,
      act: accessToken,
    };

    userAuth.accessToken = accessToken;
    userAuth = await this.userAuthService.saveOne(userAuth);

    const token = await this.userAuthService.signPayload(jwtPayload);

    return {
      loginUser: userAuth.loginName,
      token,
      userid: userAuth.id,
      role: userAuth.role.name,
    };
  }

  @Post('register')
  @Roles('master', 'admin')
  @Permission('*', 'registerNewUserAuth')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerUserDTO: RegisterUserAuthDTO) {
    let userAuth = await this.userAuthService.register(registerUserDTO);
    console.log('user created %o', userAuth);
    const accessToken = await this.userAuthService.generateAccessToken();

    const payload: Payload = {
      username: userAuth.loginName,
      act: accessToken,
    };

    userAuth.accessToken = accessToken;
    userAuth = await this.userAuthService.saveOne(userAuth);

    const token = await this.userAuthService.signPayload(payload);
    return { userAuth, token };
  }
}
