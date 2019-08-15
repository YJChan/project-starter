
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-level-alert',
  templateUrl: './app-level-alert.component.html',
  styleUrls: ['./app-level-alert.component.css']
})
export class AlertLevelComponent implements OnInit, OnDestroy {

  dismissable: boolean = false;
  type: string = 'info';
  size: boolean = false;
  message: string = '';
  alertLevel:boolean = true;
  icon:string = 'cog';
  showAlert: boolean = false;

  private subscription: Subscription;

  constructor(private alertService: AlertService) {

   }

  ngOnInit() {
    this.subscription = this.alertService.alert.subscribe(alert => {
      if(alert.level === 'APP'){
        this.message = alert.message;
        this.icon = alert.icon? alert.icon: 'cog';
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
