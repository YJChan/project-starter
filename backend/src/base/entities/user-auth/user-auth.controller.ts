import { Controller, Post, Req, Body } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { AuthenticateUserDTO, RegisterUserAuthDTO } from './dto/user-auth.dto';
import { Payload } from 'src/types/Payload';

@Controller('api/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService){}

  @Post('signin')
  async requestJsonWebTokenAfterLocalSignIn(@Body() userAuthDTO: AuthenticateUserDTO) {
    let userAuth = await this.userAuthService.login(userAuthDTO);
    
    const accessToken = await this.userAuthService.generateAccessToken();

    const jwtPayload = {
      username: userAuth.loginName,
      act: accessToken
    };    

    userAuth.accessToken = accessToken;
    userAuth = await this.userAuthService.saveOne(userAuth);

    const token = await this.userAuthService.signPayload(jwtPayload);
    
    return { userAuth, token };
  }
  
  @Post('register')
  async register(@Body() registerUserDTO: RegisterUserAuthDTO) {
    let userAuth = await this.userAuthService.register(registerUserDTO);
    console.log('user created %o', userAuth);
    const accessToken = await this.userAuthService.generateAccessToken();
    
    const payload: Payload = {
      username: userAuth.loginName,
      act: accessToken
    };

    userAuth.accessToken = accessToken;
    userAuth = await this.userAuthService.saveOne(userAuth);

    const token = await this.userAuthService.signPayload(payload);
    return { userAuth, token };
  }
}
