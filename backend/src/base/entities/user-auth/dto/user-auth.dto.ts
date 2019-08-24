import { UserAuthEntity } from '../../user-auth/user-auth.entity';
import { IsString, IsDate, IsBoolean, IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class UserAuthDTO {

  id: string;

  @IsString()
  loginType: any;

  @IsNotEmpty()
  loginName: string;

  @IsNotEmpty()
  password: string;

  salt: string;

  @IsString()
  securityQuestion: string;

  @IsString()
  securityAnswer: string;

  @IsInt()
  attemptsMade: number;

  accessToken: string;

  @IsDateString()
  lastPasswordChangedDt: Date;

  createdDate: Date;

  @IsString()
  createdBy: string;

  updatedDate: Date;

  @IsString()
  updatedBy: string;

  version: number;

}

export class AuthenticateUserDTO {
  @IsNotEmpty()
  loginName: string;

  @IsNotEmpty()
  password: string;
}

export class RegisterUserAuthDTO {
  @IsNotEmpty()
  loginName: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  passwordConfirm: string;
}

export class UserAuthRO {
  id: string;
  loginType: any;
  loginName: string;
  salt: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
  attemptsMade: number;
  lastPasswordChangedDt: Date;
  createdDate: Date;
  createdBy: string;
  updatedDate: Date;
  updatedBy: string;
  version: number;
}
