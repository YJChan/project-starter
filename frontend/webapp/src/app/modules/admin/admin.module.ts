import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { PermissionComponent } from './permission/permission.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { StatusPipe } from 'src/app/pipes/status.pipe';

@NgModule({
  declarations: [AdminComponent, UserComponent, RoleComponent, PermissionComponent, StatusPipe],
  imports: [
    CommonModule,
    ClarityModule,
    AdminRoutingModule,
    FormsModule
  ],
  exports: [
    AdminRoutingModule
  ]
})
export class AdminModule { }
