import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private subject = new Subject<any>();
  state = this.subject.asObservable();

  constructor() {
    
  }

  onLoading() {
    this.subject.next({
      loading: true
    });
  }

  onDismiss() {    
    this.subject.next({
      loading: false
    });
  }

}
