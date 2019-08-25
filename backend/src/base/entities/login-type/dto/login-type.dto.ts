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

  constructor() {
    this.name = '';
    this.params = JSON.stringify({});
    this.createdBy = '';
    this.createdDate = new Date();
    this.updatedBy = '';
    this.updatedDate = new Date();
  }
}
