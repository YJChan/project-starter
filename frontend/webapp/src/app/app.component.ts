import { Component } from '@angular/core';
import { AppConfigs } from './configs/app.configs';
import { UserAuth } from './models';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = AppConfigs.APP_NAME;
  currentUser: UserAuth;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      if (!x) {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
