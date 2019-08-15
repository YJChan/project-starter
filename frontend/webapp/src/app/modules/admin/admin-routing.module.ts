import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { PermissionComponent } from './permission/permission.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {path: 'user', component: UserComponent, canActivate: [AdminGuard]},
      {path: 'role', component: RoleComponent, canActivate: [AdminGuard]},
      {path: 'permission', component: PermissionComponent, canActivate: [AdminGuard]}
    ]
 }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
