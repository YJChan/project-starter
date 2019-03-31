import { IsNumber, IsNotEmpty } from "class-validator";
import { CodeTypeEntity } from "../../code-type/code-type.entity";

export class CodeDTO {

  id: string;

  @IsNumber()
  codeSeq: number;

  @IsNotEmpty()
  codeName: string;
  
  @IsNotEmpty()
  codeValue: string;

  codeDesc: string;

  status: boolean;

  version: number;

  createdDate: Date;

  createdBy: string;

  updatedDate: Date;

  updatedBy: string;

  codeType: CodeTypeEntity;
}