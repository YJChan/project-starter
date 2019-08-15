export interface UserInterface{
  id?:string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phoneNum?: string;
  status?: number;
}

export class User implements UserInterface{
  constructor(
    public id?:string,
    public firstName?: string,
    public lastName?: string,
    public middleName?: string,
    public email?: string,
    public phoneNum?: string,
    public status?: number
  ){
   this.id = undefined;
   this.firstName = '';
   this.lastName = '';
   this.middleName = '';
   this.email = '';
   this.phoneNum = '';
   this.status = 1;
  }
}