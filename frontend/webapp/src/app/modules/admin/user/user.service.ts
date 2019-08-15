import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AlertService } from '../../../shared/services/alert.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { Observable } from 'rxjs';
import { AppConfigs } from '../../../configs/app.configs';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private AppConfigs = AppConfigs;
  resourceUrl: string = this.AppConfigs.APP_BACKEND + 'api/user'
  authResourceUrl: string = this.AppConfigs.APP_BACKEND + 'api/auth';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) { }

  findAllUsers(): Observable<HttpResponse<any>>{
    return this.http.get(this.resourceUrl, {observe: 'response'});
  }

  findOneUser(id: string): Observable<HttpResponse<any>>{
    return this.http.get(`${this.resourceUrl}/id`, {observe: 'response'});
  }

  createUser(user: User): Observable<HttpResponse<any>>{
    return this.http.post(`${this.resourceUrl}`, user, {observe: 'response'});
  }

  updateUser(id: string, user: User): Observable<HttpResponse<any>>{
    return this.http.put(`${this.resourceUrl}/id`, user, {observe: 'response'});
  }

  deleteUser(id: string): Observable<HttpResponse<any>>{
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  activateUserAuth(id: string, userAuth: any): Observable<HttpResponse<any>>{
    return this.http.post(`${this.resourceUrl}/register-auth/${id}`, userAuth, {observe: 'response'});
  }

  deactivateUserAut(id: string): Observable<HttpResponse<any>>{
    return this.http.delete(`${this.resourceUrl}/deactivate-auth/${id}`, {observe: 'response'});
  }
}
