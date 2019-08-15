import { Component } from '@angular/core';
import { UserAuth } from 'src/app/models';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-layout',
  template: `
    <clr-main-container>
      <app-header *ngIf="currentUser"></app-header>
      <app-main [currentUser]="currentUser">
        <ng-content>
        </ng-content>
      </app-main>
    </clr-main-container>
  `,
  styles: []
})
export class LayoutComponent {
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
