import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();
    
    return next.handle().pipe(
      map(result => {
        let status = 'Success';
        if(response.statusCode !== 200){
          status = 'Error';
        }
        
        return {
          code: response.statusCode,
          time: new Date().toUTCString(),
          status: status,
          path: request.url,
          method: request.method, 
          message: 'Successfully call request',
          result: result
        }
      })
    );
  }
}