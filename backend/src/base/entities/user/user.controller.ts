import { Controller, Get, Post, Put, Delete, Body, Param, Logger, UsePipes, UseGuards, HttpException, HttpStatus, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { ValidationPipe } from '../../../shared/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserAuthDTO } from '../user-auth/dto/user-auth.dto';
import { UserAuthService } from '../user-auth/user-auth.service';
import { Roles } from '../user-auth/decorator/role.decorator';
import { Permission } from '../user-auth/decorator/permission.decorator';
import { Not, IsNull } from 'typeorm';

@Controller('api/user')
export class UserController {

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService    
  ){

  }

  @Get()  
  @Roles('admin','master')
  @Permission('*', 'getAllUser')
  getAllUsers(){
    return this.userService.showAll();
  }

  @Post()
  @Roles('admin','master')
  @Permission('*', 'createNewUser')
  @UsePipes(new ValidationPipe())
  createUser(@Body() data: UserDTO){
    return this.userService.create(data);
  }

  @Get(':id')
  @Roles('admin','master')
  @Permission('*', 'getAllUser')
  getUser(@Param('id') id:string){
    const user = this.userService.read(id);
    Logger.log(user);    
    return user;
  }

  @Put(':id')
  @Roles('admin','master')
  @Permission('*', 'updateExistingUser')
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id')id: string, @Body() data: Partial<UserDTO>){
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @Roles('admin','master')
  @Permission('*', 'deleteUser')
  destroyUser(@Param('id') id: string){
    return this.userService.delete(id);
  }

  @Post('register-auth/:id')
  @Roles('admin','master')
  @Permission('*', 'registerNewUserAuth')
  @UsePipes(new ValidationPipe())
  async enableAccess(@Param('id') userId, @Body() userRegisterAuth: RegisterUserAuthDTO){    
    const userAuth = await this.userAuthService.register(userRegisterAuth);
    const updatedUserAuth = this.userService.updateUserAuth(userId, userAuth.id);

    return updatedUserAuth;
  }

  @Delete('deactivate-auth/:id')
  @Roles('admin','master')
  @Permission('*', 'deactivateExistingUserAuth')
  @UseGuards(AuthGuard())  
  async disableAccess(@Param('id') id: string){
    const unregister = await this.userAuthService.unregister(id);
    return unregister;
  }

  @Post('attach-role/:id')
  @Roles('admin', 'master')
  @Permission('*', 'attachRoleToUserAuth')
  async attachRole(@Param('id') id: string, @Body()data: any){
    try{
      if(data.roleId === undefined){
        throw new HttpException({
          errCode: 'REQ.INVALIDPARAM',
          message: 'Invalid request parameters'
        }, HttpStatus.BAD_REQUEST);
      }
      const user = await this.userService.findUserAuth({
        where: {id: id, userAuth: Not(IsNull())},
        relations: ['userAuth']
      });
      
      if(! user){
        throw new HttpException({
          errCode: 'USER.NOTFOUND',
          message: 'User not found'
        }, HttpStatus.NOT_FOUND);
      }
      if(! user.userAuth){
        throw new HttpException({
          errCode: 'USER.NOAUTH',
          message: 'User does not has authentication enabled'
        }, HttpStatus.BAD_REQUEST);
      }
      
      const userAuth = await this.userAuthService.attachRole(user.userAuth.id, data.roleId);      
      if(userAuth.raw.changedRows === 0){
        throw new HttpException('Fail to attach role to user', HttpStatus.BAD_REQUEST);
      }

      return true;
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

  @Delete('detach-role/:id')
  @Roles('admin', 'master')
  @Permission('*', 'detachRoleToUserAuth')
  async detachRole(@Param('id') id: string){
    try{
      const userAuth = this.userAuthService.detachRole(id);
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
}
