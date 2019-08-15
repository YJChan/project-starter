import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot
} from '@angular/router';

import { AuthenticationService } from '../shared/services/authentication.service';
import { AlertService } from '../shared/services/alert.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    canLoad(route: Route): boolean{
      const currentUser = this.authenticationService.currentUserValue;
      console.log('can load guard %o', currentUser);
      if (currentUser.role === 'admin' || currentUser.role === 'master') {
          // authorised so return true
          this.alertService.info('You are accessing admin feature', 'APP'); 
          return true;
      }
      return false;
    }
}
