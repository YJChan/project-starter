import { IsNotEmpty, IsNumber, IsString, Min, Max } from "class-validator";
import { RoleEntity } from "../../role/role.entity";

export class PermissionDTO{  
  id: string;

  createdDate: Date;

  updatedDate: Date;

  @IsString()
  name: string;

  @IsNotEmpty()
  action: string;

  @IsNotEmpty()
  resource: string;
  
  @IsString()
  description: string;

  role: RoleEntity;
  
}