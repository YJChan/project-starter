import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { AppConfigs } from 'src/app/configs/app.configs';
import { Resp } from '../../../interfaces/response.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Role } from 'src/app/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  appConfig = AppConfigs;
  resourceUrl: string = this.appConfig.APP_BACKEND + 'api/role';

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  findAllRole(): Observable<any>{
    return this.http.get(this.resourceUrl, {observe: 'response'});
  }

  async findOneRole(id: string): Promise<any>{
    let role: any = null;
    const response: Resp = await this.http.get(`${this.resourceUrl}/${id}`).toPromise();
    if(response.code === 200){
      role = response.result;
    }else{
      this.alertService.warning(response.message, 'STANDARD');
    }
    return role;
  }

  async updateRole(role: Role){
    console.log('role to save %o', role);
    const response: Resp = await this.http.put(`${this.resourceUrl}/${role.id}`, role).toPromise();
    if(response.code === 200){
      console.log('role saved', response);
      this.alertService.success(response.message, 'STANDARD');
      return true;
    }else{
      this.alertService.danger(response.message, 'STANDARD');
      return false;
    }
  }

  async createRole(role: Role){
    try{
      const response: Resp = await this.http.post(this.resourceUrl, role).toPromise();
      if(response.code === 200){
        this.alertService.success(response.message, 'STANDARD');
        return true;
      }
    }catch(err){
      this.alertService.danger(err, 'STANDARD');
      return false;
    }
  }

  async deleteRole(id: string){
    try{
      const response: Resp = await this.http.delete(`${this.resourceUrl}/${id}`).toPromise();
      if(response.code === 200){
        this.alertService.success('Role has been deleted', 'STANDARD');
        return true;
      }else{
        
      }
    }catch(err){
      this.alertService.danger(err, 'STANDARD');
      return false;
    }
    
  }
}
