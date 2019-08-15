import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard, AdminGuard } from './guards';
import { AuthComponent } from './modules/auth/auth.component';
import { MainComponent } from './ui/layout/main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthComponent},
  {
    path: 'administrator',
    loadChildren: './modules/admin/admin.module#AdminModule',
    canLoad: [AdminGuard]
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
     enableTracing: false,
     preloadingStrategy: PreloadAllModules,
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
