
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  dismissable: boolean = false;
  type: string = 'info';
  size: boolean = false;
  message: string = '';
  alertLevel:boolean = false;
  icon:string = 'cog';
  showAlert: boolean = false;

  private subscription: Subscription;

  constructor(private alertService: AlertService) {
    
   }

  ngOnInit() {
    this.subscription = this.alertService.alert.subscribe(alert => {
      if(alert.level === 'STANDARD'){
        this.message = alert.message;
        this.icon = alert.icon !== null? alert.icon : 'cog';
        this.showAlert = true;
        this.type = alert.type;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  dismiss(){
    this.showAlert = false;
  }
}
