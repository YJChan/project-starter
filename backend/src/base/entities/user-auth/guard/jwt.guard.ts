import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthService } from '../user-auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private userAuthService: UserAuthService, 
    private readonly reflector: Reflector) {
    super({});
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {       
    //find out what role this end point is required    
    const roles = this.reflector.get<string[]>('roles', context.getHandler());    
    if (!roles) {
      throw new HttpException('This resource is not available', HttpStatus.BAD_GATEWAY);
    }

    //find out what permission this end point is required
    const permission = this.reflector.get<string[]>('permission', context.getHandler());    
    if (!permission) {
      throw new HttpException('This resource is not available', HttpStatus.BAD_GATEWAY);
    }

    //handle request headers, such as authorization token
    const request = context.switchToHttp().getRequest();  
    console.log('request url %s', request.url);
    console.log('request method %s', request.method);
    const authHeaders = request.headers.authorization;
    if(authHeaders === undefined || authHeaders === null){
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }    
    const tokenArray = authHeaders.split(" ");
       
    //verify user access right to end point by role, permission and resource
    try{
      const token = tokenArray[1];
      const decoded = verify(token, process.env.SECRET_KEY);
      let payload:any = decoded;      
    
      return this.userAuthService.seekPermission(payload, roles, permission);
    }catch(err){
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}