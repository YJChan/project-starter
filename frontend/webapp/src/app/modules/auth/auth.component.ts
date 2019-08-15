import { first } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../shared/services/authentication.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorMsg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in      
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginName: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.loginName.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if(this.returnUrl !== ''){
            this.router.navigate([this.returnUrl]);
          }else{
            this.router.navigate(['/dashboard']);
          }
        },
        error => {
          this.errorMsg = error;
          setTimeout(() => {
            this.errorMsg = '';
          }, 5000);          
          this.loading = false;
        });
  }
}
