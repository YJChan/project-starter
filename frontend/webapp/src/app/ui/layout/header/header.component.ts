import { Component, OnInit } from '@angular/core';
import { AppConfigs } from 'src/app/configs/app.configs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = AppConfigs.APP_NAME;
  route: any;
  headerLinks = [
    { link: ['/', 'dashboard'], icon: 'home', roleRequired: ['admin', 'master', 'user']},
    { link: ['/', 'administrator'], icon: 'administrator', roleRequired: ['admin', 'master']},
  ];

  subLinks = [
    { link : ['/', 'administrator'], label: 'Administration' , roleRequired: ['admin', 'master']},
    { link : ['/', 'dashboard'], label: 'Dashboard', roleRequired: ['admin', 'master', 'user']},
  ];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.route = this.router.url;
  }

  ngOnInit() {

  }

  signout() {
    this.authenticationService.logout();
  }
}
