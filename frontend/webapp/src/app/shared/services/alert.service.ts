import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AlertService {
  private subject = new Subject<any>();
  alert = this.subject.asObservable();

  constructor() {
    
  }

  success(message: string, level: any, icon: string = null) {
    this.subject.next({
      type: 'success',
      message: message,
      level: level,
      icon: icon? icon: 'success-standard'
    });
  }

  danger(message: string, level: any, icon: string = null) {    
    this.subject.next({
      type: 'danger',
      message: message,
      level: level,
      icon: icon? icon: 'error-standard'
    });
  }

  warning(message: string, level: any, icon: string = null){
    this.subject.next({
      type: 'warning',
      message: message,
      level: level,
      icon: icon? icon: 'warning-standard'
    })
  }

  info(message: string, level: any, icon: string = null){
    this.subject.next({
      type: 'info',
      message: message,
      level: level,
      icon: icon? icon: 'info-standard'
    })
  }

}
