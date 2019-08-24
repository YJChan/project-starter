import { UserAuthEntity } from '../../user-auth/user-auth.entity';
import { IsString, IsDate, IsBoolean, IsInt, IsDateString } from 'class-validator';

export class UserDTO {

  id: string;

  readonly createdDate: Date;

  readonly updatedDate: Date;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly middleName: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly phoneNum: string;

  readonly status: boolean;

  readonly version: number;

  userLogin: UserAuthEntity;
}

export class UserRO {
  id: string;
  createdDate: Date;
  updatedDate: Date;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNum: string;
  status: boolean;
  version: number;
  userLogin: UserAuthEntity;
}
