import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { UserAuthService } from "../user-auth.service";
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){  
  constructor(private userAuthService: UserAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });    
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.userAuthService.validateUser(payload);    
    console.log('payload, %o', payload);
    if (!user) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }    
    
    return done(null, user, payload.act);
  }
}