import { Injectable } from '@angular/core';
import { AppConfigs } from '../../../configs/app.configs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AlertService } from '../../../shared/services/alert.service';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  appConfig = AppConfigs;
  resourceUrl: string = this.appConfig.APP_BACKEND + 'api/permission';

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  findAllPermissions(): Observable<HttpResponse<any>>{
    return this.http.get(this.resourceUrl, {observe: 'response'});
  }

  findOnePermission(id: string): Observable<any> {
    return this.http.get(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  updatePermission(id: string, permission: Permission): Observable<HttpResponse<any>> {
    return this.http.put(`${this.resourceUrl}/${id}`, permission, {observe: 'response'});
  }

  createPermission(permission: Permission): Observable<HttpResponse<any>>{
    return this.http.post(`${this.resourceUrl}`, permission, {observe: 'response'});
  }

  deletePermission(id: string): Observable<HttpResponse<any>>{
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }
}
