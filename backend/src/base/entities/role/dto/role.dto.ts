import { IsNotEmpty, IsNumber, IsString, Min, Max } from "class-validator";
import { PermissionEntity } from "../../permission/permission.entity";

export class RoleDTO{  
  id: string;

  createdDate: Date;

  updatedDate: Date;

  @IsNotEmpty()
  name: string;

  @Min(1)
  @Max(9)
  level: number;
  
  status: boolean;

  @IsString()
  description: string;
    
  permissions: PermissionEntity[];
}