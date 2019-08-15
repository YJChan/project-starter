import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { LoadingComponent } from 'src/app/shared/shared-components';

const components = [
  DashboardComponent
];

@NgModule({
  declarations: [...components
  ],
  imports: [
    CommonModule,
    RouterModule
  ],exports: [DashboardRoutingModule]
})
export class DashboardModule { }
