import { Component, OnInit } from '@angular/core';
import { RoleService } from './role.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Role } from '../../../models/role.model';
import { Utils } from '../../../shared/app.utils';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roles: Role[] = [];
  editRole: boolean = false;
  role: Role;
  level: any[];
  deleteRole: boolean = false;
  roleToDelete: string = '';
  roleToDeleteId: string = '';

  constructor(
    private roleService: RoleService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) { 
    this.level = new Array(9).fill(null).map((x, index) => 1 + index);
  }

  ngOnInit() {
    this.role = new Role();
    this.roleService.findAllRole()
      .subscribe(
        response => {
          if(response.body.code === 200){
            this.roles = response.body.result;
          }
        });
  }

  create(){
    this.editRole = true;
  }

  async edit(id: string){
    this.loadingService.onLoading();
    this.editRole = true;
    this.role = await this.roleService.findOneRole(id);
    console.log('role %o', this.role);
    this.loadingService.onDismiss();
  }

  async delete(id: string){
    let index = Utils.getObjPosInArray(this.roles, 'id', id);
    this.roleToDelete = this.roles[index].name;
    this.roleToDeleteId = id;
    this.deleteRole = true;
  }

  async confirmDelete(){
    let deleted = await this.roleService.deleteRole(this.roleToDeleteId);
    this.roleService.findAllRole()
      .subscribe(
        response => {
          if(response.body.code === 200){
            this.roles = response.body.result;
          }
        });
    this.roleToDelete = '';
    this.roleToDeleteId = '';
    this.deleteRole = false;
  }

  async getRoles(){
    return await this.roleService.findAllRole();
  }

  async save(){
    let roleToSave = new Role();
    roleToSave.name = this.role.name;
    roleToSave.description = this.role.description;
    roleToSave.id = this.role.id;
    roleToSave.level = this.role.level !== undefined? +this.role.level: 1;
    roleToSave.status = this.role.status;
    let saved = false;

    if(roleToSave.id !== undefined && roleToSave.id !== '' && roleToSave.id !== null){
      saved = await this.roleService.updateRole(roleToSave);
    }else{
      saved = await this.roleService.createRole(roleToSave);
    }
    if(saved){
      this.role = new Role();
      this.roleService.findAllRole()
      .subscribe(
        response => {
          if(response.body.code === 200){
            this.roles = response.body.result;
          }
        });
    }
    this.editRole = false;
  }

}
