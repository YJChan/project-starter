import { Injectable, HttpException, HttpStatus, Logger, OnModuleInit } from '@nestjs/common';
import { UserAuthEntity } from './user-auth.entity';
import { Repository, Not, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthDTO, AuthenticateUserDTO, UserAuthRO, RegisterUserAuthDTO } from './dto/user-auth.dto';
import { sign } from 'jsonwebtoken';
import { Payload } from 'src/types/Payload';
import { Encryption } from '../../../utilities/encryption';
import { ModuleRef } from '@nestjs/core';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { RoleEntity } from '../role/role.entity';

@Injectable()
export class UserAuthService implements OnModuleInit{
  
  private userService: UserService;
  private roleService: RoleService;
  private encryptor: Encryption;
  constructor(
    @InjectRepository(UserAuthEntity)
    private userAuthRepository: Repository<UserAuthEntity>,             
    private readonly moduleRef: ModuleRef    
  ) {
    this.encryptor = new Encryption();      
  }

  onModuleInit() {
    this.userService = this.moduleRef.get(UserService, {strict: false});
    this.roleService = this.moduleRef.get(RoleService, {strict: false});
  }

  async register(registerUserAuthDTO: RegisterUserAuthDTO) {
    const { loginName } = registerUserAuthDTO;
    const user = await this.userAuthRepository.findOne({ loginName });
    
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    if(registerUserAuthDTO.password !== registerUserAuthDTO.passwordConfirm){
      throw new HttpException('Password does not match', HttpStatus.BAD_REQUEST);
    }

    const userAuthToCreate = new UserAuthRO();
    userAuthToCreate.loginType = 1;
    userAuthToCreate.loginName = registerUserAuthDTO.loginName;
    userAuthToCreate.salt = await this.encryptor.generateSalt();    
    userAuthToCreate.password = await this.encryptor.generateHashedPassword(userAuthToCreate.salt, registerUserAuthDTO.password);    
    userAuthToCreate.securityQuestion = '';
    userAuthToCreate.securityAnswer = '';
    userAuthToCreate.attemptsMade = 0;    
    userAuthToCreate.createdBy = 'ADMIN';
    userAuthToCreate.lastPasswordChangedDt = new Date();
    userAuthToCreate.updatedBy = 'ADMIN';

    const userAuth = await this.userAuthRepository.save(userAuthToCreate);
    Logger.log('created user ' + userAuth.id);

    return userAuth;
  }

  async unregister(id: string){
    console.log('user id is %s', id);
    let user = await this.userService.findUserAuth({
      where: {id: id, userAuth: Not(IsNull())},
      relations: ['userAuth']
    });
    console.log('user with user auth %o', user);
    if(! user){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);      
    }  
    if(! user.userAuth)  {
      throw new HttpException('User does not have any authentication setup', HttpStatus.NOT_FOUND);
    }
    const userAuthId = user.userAuth.id;    
    user = await this.userService.removeUserAuth(user.id);
    
    let unregisterResult = await this.userAuthRepository.delete(userAuthId);
    if(unregisterResult.affected === 0){
      throw new HttpException('User authentication cannot detach!', HttpStatus.BAD_REQUEST);
    }

    return unregisterResult;
  }

  async attachRole(userAuthId: string, roleId:string){
    try{
      const role = await this.roleService.findOne(roleId, false);
      if(! role){
        throw new HttpException({errCode: 'ROLE.NOTFOUND', message: 'Role not found'}, HttpStatus.NOT_FOUND);
      }
      const userAuth = await this.userAuthRepository.update(userAuthId, {role: role});

      return userAuth;
      
    }catch(err){
      if(err.code !== undefined){
        throw new HttpException({
          errCode: err.code,
          message: err.message
        }, HttpStatus.BAD_REQUEST);  
      }else{
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async detachRole(userId: string){
    try{      
      const user = await this.userService.read(userId);
      if(! user.userAuth){
        throw new HttpException({
          errCode: 'AUTH.NOTFOUND',
          message: 'User does not have any authentication setup'
        }, HttpStatus.BAD_REQUEST);
      }
      let userAuth = await this.userAuthRepository.findOne({
        where: {id: user.userAuth.id}
      });

      userAuth.role = null;
      const detachedRole = this.userAuthRepository.update(user.userAuth.id, userAuth);      
      userAuth = await this.userAuthRepository.findOne({
        where: {
          id: user.userAuth.id
        }
      });

      return userAuth;
    }catch(err){
      if(err.code !== undefined){
        throw new HttpException({
          errCode: err.code,
          message: err.message
        }, HttpStatus.BAD_REQUEST);  
      }else{
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async login(data: AuthenticateUserDTO){
    const {loginName, password} = data;
    
    const user = await this.userAuthRepository.findOne({
      where : {loginName},
      relations: ['role']
    });

    console.log('user %o', user);

    if(! user || !(await this.encryptor.comparePassword(password, user.password))){
      throw new HttpException('Invalid login', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async findOne(loginName: string){
    const userAuth = await this.userAuthRepository.findOne({
      where: { loginName }
    });
    return userAuth;
  }

  async saveOne(userAuth: UserAuthDTO){
    const user = await this.userAuthRepository.save(userAuth);
    if(!user){
      throw new HttpException('Failed to create new user', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async generateAccessToken(){
    return await this.encryptor.generateAccessToken();    
  }

  async findByPayload(payload: Payload) {
    const { username, act } = payload;
    return await this.userAuthRepository.findOne({ loginName: username, accessToken: act});
  }

  async signPayload(payload: Payload){
    return sign(payload, process.env.SECRET_KEY, {expiresIn: process.env.TOKEN_EXPIRY});
  }

  async validateUser(payload: Payload) {
    return await this.findByPayload(payload);
  }

  /**
   * Find out the users who holding this role
   * @param id role id
   */
  async findRoleInUserAuth(id: string){
    return await this.userAuthRepository.find({
      where: {role: id}
    });
  }

  async seekPermission(payload: any, roles: any, permissions: any){
    let accessPermitted: boolean = false;
    let validRole: boolean = false;
    const { username, act } = payload;

    const user = await this.userAuthRepository.findOne({
      where : { loginName: username, accessToken: act},
      relations: ['role']
    });
    
    if(!user){
      throw new HttpException('Invalid user authentication request', HttpStatus.BAD_REQUEST);
    }
    //console.log('user who seek permission %o', user);
    if(!user.role){
      throw new HttpException('Unknow role, all request is rejected', HttpStatus.FORBIDDEN);
    }

    const roleAndPermissions = await this.roleService.findOne(user.role.id);
    //console.log('role and permission %o', roleAndPermissions.permissions);

    if(!roleAndPermissions.permissions){
      throw new HttpException('Role without permission is denied to access any api', HttpStatus.BAD_REQUEST);
    }

    for(let i = 0; i < roles.length; i ++){
      if(user.role.name === roles[i] && user.role.status){
        validRole = true;
        break;
      }
    }

    if(! validRole){
      throw new HttpException('User does not has required role', HttpStatus.UNAUTHORIZED);
    }
    
    for(let i = 0; i < roleAndPermissions.permissions.length; i ++){
      for(let n = 0; n < permissions.length; n ++){
        if(roleAndPermissions.permissions[i].action === permissions[n]){
          accessPermitted = true;
          break;
        }
      }      
    }
    console.log('access permission is %s ', accessPermitted);

    return accessPermitted;
  }
}
