import { Controller, Get, Post, Put, Delete, Body, Param, Logger, UsePipes, UseGuards, HttpException, HttpStatus, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserAuthDTO } from '../user-auth/dto/user-auth.dto';
import { UserAuthService } from '../user-auth/user-auth.service';
import { Roles } from '../user-auth/decorator/role.decorator';
import { JwtAuthGuard } from '../user-auth/guard/jwt.guard';
import { Permission } from '../user-auth/decorator/permission.decorator';

@Controller('api/user')
export class UserController {

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService
  ){

  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin','user')
  @Permission('getAllUser')
  getAllUsers(){
    return this.userService.showAll();
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe())
  createUser(@Body() data: UserDTO){
    return this.userService.create(data);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  getUser(@Param('id') id:string){
    const user = this.userService.read(id);
    Logger.log(user);    
    return user;
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id')id: string, @Body() data: Partial<UserDTO>){
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  destroyUser(@Param('id') id: string){
    return this.userService.delete(id);
  }

  @Post('register-auth/:id')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe())
  async enableAccess(@Param('id') userId, @Body() userRegisterAuth: RegisterUserAuthDTO){    
    const userAuth = await this.userAuthService.register(userRegisterAuth);
    const updatedUserAuth = this.userService.updateUserAuth(userId, userAuth.id);

    return updatedUserAuth;
  }

  @Delete('deactivate-auth/:id')
  @UseGuards(AuthGuard())  
  async disableAccess(@Param('id') id: string){
    const unregister = await this.userAuthService.unregister(id);
    return unregister;
  }
}
