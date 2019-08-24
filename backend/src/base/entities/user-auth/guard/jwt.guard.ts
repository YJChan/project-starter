import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthService } from '../user-auth.service';
import { SpecialResourceList } from './special-resource-list';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  specialResourceLists = SpecialResourceList;

  constructor(private userAuthService: UserAuthService,
              private readonly reflector: Reflector) {
    super({});
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // handle request headers, such as authorization token, whitelis resource and black list resource
    const request = context.switchToHttp().getRequest();

    for (const blacklist of this.specialResourceLists.blacklist) {
      if (request.url === blacklist) {
        throw new HttpException('This resource is not available', HttpStatus.BAD_GATEWAY);
      }
    }

    for (const whitelist of this.specialResourceLists.whitelist) {
      if (request.url === whitelist) {
        return true;
      }
    }

    // find out what role this end point is required
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      throw new HttpException('This resource is not available', HttpStatus.BAD_GATEWAY);
    }

    // find out what permission this end point is required
    const permission = this.reflector.get<string[]>('permission', context.getHandler());
    if (!permission) {
      throw new HttpException('This resource is not available', HttpStatus.BAD_GATEWAY);
    }

    /**
     * Plan to allow non role and permission role, if there is any route that would allow publicly call
     */

    const authHeaders = request.headers.authorization;
    if (authHeaders === undefined || authHeaders === null) {
      throw new HttpException('Request is not authorized', HttpStatus.UNAUTHORIZED);
    }
    const tokenArray = authHeaders.split(' ');

    // verify user access right to end point by role, permission and resource
    try {
      const token = tokenArray[1];
      const decoded = verify(token, process.env.SECRET_KEY);
      const payload: any = decoded;

      return this.userAuthService.seekPermission(payload, roles, permission);
    } catch (err) {
      if (err.name !== undefined) {
        if (err.name === 'TokenExpiredError') {
          throw new HttpException(err, HttpStatus.UNAUTHORIZED);
        } else if (err.name === 'JsonWebTokenError') {
          throw new HttpException(err, HttpStatus.UNAUTHORIZED);
        } else {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
