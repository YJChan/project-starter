import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private loadingService: LoadingService
  ) { 
    
  }

  ngOnInit() {
    // this.alertService.success('test', 'APP', 'user');
    // setTimeout(() => {
    //   this.loadingService.onDismiss();
    // }, 2000);
    // this.loadingService.onLoading();
  }

}
