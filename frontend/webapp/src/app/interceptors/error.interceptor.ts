import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AlertService } from '../shared/services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private alertService: AlertService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 && err.error.path !== '/api/auth/sign-in') {
                // auto logout if 401 response returned from api
                let sec = 0;
                this.alertService.danger('You are not authorized!, you will be log out in a few seconds', 'APP');
                setTimeout(() => {
                    this.authenticationService.logout();
                    location.reload(true);
                }, 5000);          
            }
            
            const error = err.error.message || err.statusText;
            //this.alertService.warning(error, 'STANDARD');
            return throwError(error);
        }))
    }
}