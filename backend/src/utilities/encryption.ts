import * as bcrypt from 'bcryptjs';

export class Encryption {

  public async generateSalt(){
    const salt = await bcrypt.genSalt(8);
    return salt;
  }

  public async generateHashedPassword(salt: string, password: string){
    return await bcrypt.hash(password, salt);
  }

  public async comparePassword(password: string, attemps: string): Promise<boolean> {    
    return await bcrypt.compare(password, attemps);
  }

  public async generateAccessToken() {
    return this.guid();
  }

  public guid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  private s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

}
