import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {

  onLoading: boolean;
  private subscription: Subscription;

  constructor(private loadingService: LoadingService) {
    this.onLoading = false;
   }

  ngOnInit() {
    this.subscription = this.loadingService.state.subscribe(state => {
      this.onLoading = state.loading;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
