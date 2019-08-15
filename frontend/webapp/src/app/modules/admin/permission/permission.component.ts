import { Component, OnInit } from '@angular/core';
import { PermissionService } from './permission.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../shared/services/alert.service';
import { RoleService } from '../role/role.service';
import { Role } from '../../../models/role.model';
import { Permission } from '../../../models/permission.model';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Utils } from 'src/app/shared/app.utils';
import { ClrDatagridStringFilterInterface } from '@clr/angular';

class PermissionFilter implements ClrDatagridStringFilterInterface<Permission> {
  accepts(permission: Permission, search: string):boolean {
      return "" + permission.action == search
          || permission.action.toLowerCase().indexOf(search) >= 0;
  }
}

class RoleFilter implements ClrDatagridStringFilterInterface<Permission> {
  accepts(permission: Permission, search: string):boolean {
      return "" + permission.role.name == search
          || permission.role.name.toLowerCase().indexOf(search) >= 0;
  }
}

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  permissions: any[] = [];
  pages: number;
  permission: Permission;
  roles: any[];
  editPermission: boolean;
  deletePermission: boolean;
  permissionToDelete: any;
  permissionFilter = new PermissionFilter();
  roleFilter = new RoleFilter();

  constructor(
    private permissionService: PermissionService,
    private roleService: RoleService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) { 
    this.permission = new Permission();
  }

  ngOnInit() {
    this.getPermissions();
    this.getRoles();
  }

  getPermissions(){
    this.loadingService.onLoading();
    this.permissionService.findAllPermissions()
      .subscribe(
        (res: HttpResponse<any>) => {
          console.log('result %o', res.body);
          this.permissions = res.body.result;
          this.pages = this.permissions.length;
          this.loadingService.onDismiss();
        },
        (err: HttpErrorResponse) => {
          this.alertService.warning(err.message , 'STANDARD');
          this.loadingService.onDismiss();
        }
      );
  }

  getRoles(){
    this.roleService.findAllRole()
    .subscribe(
      response => {
        if(response.body.code === 200){
          console.log('result %o', response.body);
          this.roles = response.body.result;
        }
      });
  }

  create(){
    this.editPermission = true;
  }

  edit(id: string){
    this.loadingService.onLoading();
    this.editPermission = true;
    this.permissionService.findOnePermission(id)
      .subscribe(
        (res: HttpResponse<any>) => {
          this.loadingService.onDismiss();
          if(res.body.code === 200){
            this.permission = res.body.result;
          }
        },
        (err: HttpErrorResponse) => {
          this.loadingService.onDismiss();
          this.alertService.warning(err.message, 'STANDARD');
        }
      );
  }

  delete(id: string){
    let index = Utils.getObjPosInArray(this.permissions, 'id', id);
    this.permission = this.permissions[index];
    this.permissionToDelete = this.permission.name;
    this.deletePermission = true;
  }

  confirmDelete(){
    if(Utils.isNotNull(this.permission.id)){
      this.permissionService.deletePermission(this.permission.id)
        .subscribe((res: HttpResponse<any>) => {
          if(res.body.code === 200){
            this.deletePermission = false;
            this.alertService.success('Successfully deleted permission', 'STANDARD');
            this.getPermissions();
          }
        }, (err: HttpErrorResponse) =>{
          this.deletePermission = false;
          this.alertService.warning(err.message, 'STANDARD');
        });
    }
  }

  save(){
    let permissionToSave = new Permission();
    permissionToSave.id = this.permission.id;
    permissionToSave.name = this.permission.name;
    permissionToSave.action = this.permission.action;
    permissionToSave.description = this.permission.description;
    permissionToSave.resource = this.permission.resource;
    permissionToSave.role = this.permission.role;

    if(Utils.isNotNull(this.permission.id)){
      this.permissionService.updatePermission(this.permission.id, permissionToSave)
        .subscribe((res: HttpResponse<any>) => {
            this.editPermission = false;
            if(res.body.code === 200){
              this.getPermissions();
              this.permission = new Permission();
              this.alertService.success('Successfully updated permission', 'STANDARD');
            }
          },
          (err: HttpErrorResponse) => {
            this.editPermission = false;
            this.alertService.warning(err.message, 'STANDARD');
          });
    }else{
      this.permissionService.createPermission(permissionToSave)
      .subscribe((res: HttpResponse<any>) => {
        this.editPermission = false;
        if(res.body.code === 200){
          this.getPermissions();
          this.permission = new Permission();
          this.alertService.success('Successfully created permission', 'STANDARD');
        }
      },
      (err: HttpErrorResponse) => {
        this.editPermission = false;
        this.alertService.warning(err.message, 'STANDARD');
      });
    }
  }

}
