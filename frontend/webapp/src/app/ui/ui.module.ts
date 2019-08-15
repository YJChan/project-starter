import { NgModule, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClarityModule } from '@clr/angular';

import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MainComponent } from './layout/main/main.component';
import { AlertComponent} from '../shared/shared-components';
import { HasRoleDirective } from '../shared/directives/has-role.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    AlertComponent,
    HasRoleDirective
  ],
  exports: [
    LayoutComponent,
  ]
})
export class UiModule { }