import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ClarityIcons } from '@clr/icons';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  exports: [AuthComponent,
    FormsModule,
    ReactiveFormsModule]
})
export class AuthModule { }
