import { RoleInterface, Role } from './role.model';

export interface PermissionInterface{
  id?: string;
  name?: string;
  action?: string;
  resource?: string;
  description?: string;
  role?: RoleInterface;
}

export class Permission implements PermissionInterface{
  constructor(
    public id?: string,
    public name?: string,
    public action?: string,
    public resource?: string,
    public description?: string,
    public role?: RoleInterface
  ){
    this.id = undefined;
    this.name = '';
    this.action = '';
    this.resource = '';
    this.description = ''
    this.role = new Role();
  }
}