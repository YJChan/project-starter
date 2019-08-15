export interface RoleInterface {
  id?: string;
  name?: string;
  level?: number;
  status?: number;
  description?: string;
}

export class Role implements RoleInterface{
  constructor(
    public id?: string,
    public name?: string,
    public level?: number,
    public status?: number,
    public description?: string,
  ){
    id = undefined;
    name = '';
    level = 0;
    status = 0;
    description = '';
  }
}