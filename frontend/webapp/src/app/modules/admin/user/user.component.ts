import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { AlertService } from '../../../shared/services/alert.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ClrDatagridStringFilterInterface } from '@clr/angular';
import { User } from '../../../models/user.model';

class UserEmailFilter implements ClrDatagridStringFilterInterface<User> {
  accepts(user: User, search: string):boolean {
      return "" + user.email == search
          || user.email.toLowerCase().indexOf(search) >= 0;
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any[] = [];
  userEmailFilter = new UserEmailFilter();

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.findAllUsers()
      .subscribe((res: HttpResponse<any>) => {
        if(res.body.code === 200){
          console.log('users %o', res.body.result);
          this.users = res.body.result;
        }
      }, (err: HttpErrorResponse) => {
        this.alertService.warning(err.message , 'STANDARD');
      });
  }


}
