import { Controller, Post, UsePipes, ValidationPipe, UseGuards, Put, Get, Param, Delete, Body } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Roles } from '../user-auth/decorator/role.decorator';
import { Permission } from '../user-auth/decorator/permission.decorator';
import { PermissionDTO } from './dto/permission.dto';

@Controller('api/permission')
export class PermissionController {

  constructor(private permissionService: PermissionService){}

  @Post()
  @UsePipes(new ValidationPipe())
  @Roles('master')
  @Permission('*')  
  async createPermission(@Body() data: PermissionDTO){
    return await this.permissionService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @Roles('master')
  @Permission('*')
  async updatePermission(@Param('id') id: string, @Body() data: Partial<PermissionDTO>){
    return await this.permissionService.update(id, data);
  }

  @Get(':id')  
  @Roles('master')
  @Permission('*')
  async getPermission(@Param('id') id: string){
    return await this.permissionService.findOne(id);
  }

  @Get()
  @Roles('master')
  @Permission('*')
  async getAllPermission(){
    return await this.permissionService.findAll();
  }

  @Delete(':id')
  @Roles('master')
  @Permission('*')
  async deletePermission(@Param('id') id: string){
    return await this.permissionService.delete(id);
  }
}
