import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiModule } from './ui/ui.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertLevelComponent } from './shared/shared-components';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AlertService } from './shared/services/alert.service';
import { DashboardRoutingModule } from './modules/dashboard/dashboard.routing.module';
import { LoadingService } from './shared/services/loading.service';
import { LoadingComponent } from './shared/shared-components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertLevelComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    UiModule,
    AuthModule,
    DashboardModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AlertService, LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
