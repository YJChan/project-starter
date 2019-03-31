import { Controller, Body, Post, UsePipes, ValidationPipe, Get, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDTO } from './dto/role.dto';
import { Roles } from '../user-auth/decorator/role.decorator';
import { Permission } from '../user-auth/decorator/permission.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/role')
export class RoleController {

  constructor(
    private roleService: RoleService
  ){

  }

  @Post()  
  @UsePipes(new ValidationPipe())
  @Roles('master')
  @Permission('*')
  @UseGuards(AuthGuard('jwt'))
  async createRole(@Body() data: RoleDTO){
    return this.roleService.create(data);
  }

  @Get(':id')
  @Roles('master')
  @Permission('*')
  @UseGuards(AuthGuard('jwt'))
  async getRole(@Param('id') id: string){
    return await this.roleService.findOne(id);
  }

  @Get()
  @Roles('master')
  @Permission('*')
  @UseGuards(AuthGuard('jwt'))
  async getAllRoles(){
    return await this.roleService.findAll();    
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @Roles('master')
  @Permission('*')
  @UseGuards(AuthGuard('jwt'))
  async updateRole(@Param('id') id:string, @Body() data: Partial<RoleDTO>){
    return await this.roleService.update(id, data);
  }

  @Delete(':id')
  @Roles('master')
  @Permission('*')
  @UseGuards(AuthGuard('jwt'))
  async deleteRole(@Param('id') id: string){
    return await this.roleService.delete(id)
  }
  
}
