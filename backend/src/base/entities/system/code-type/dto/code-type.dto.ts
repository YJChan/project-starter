import { IsString } from "class-validator";
import { CodeEntity } from "../../code/code.entity";

export class CodeTypeDTO {
  
  id: string;

  @IsString()
  type: string;

  desc: string;

  locale: string;

  status: boolean;

  createdDate: Date;

  createdBy: string;

  updatedDate: Date;
  
  updatedBy: string;

  codes: CodeEntity[];

}