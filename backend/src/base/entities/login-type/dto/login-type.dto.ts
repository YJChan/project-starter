import { IsString, IsJSON } from 'class-validator';

export class LoginTypeDTO {
  id: string;

  name: string;

  @IsJSON()
  params: string;

  createdDate: Date;

  @IsString()
  createdBy: string;

  @IsString()
  updatedBy: string;

  updatedDate: Date;
}