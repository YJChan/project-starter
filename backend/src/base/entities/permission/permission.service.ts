import { Injectable, HttpException, HttpStatus, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from './permission.entity';
import { Repository } from 'typeorm';
import { PermissionDTO } from './dto/permission.dto';
import { RoleService } from '../role/role.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class PermissionService implements OnModuleInit {

  private roleService: RoleService;
  constructor(
    @InjectRepository(PermissionEntity) private permissionRepository: Repository<PermissionEntity>,
    private moduleRef: ModuleRef
  ){

  }

  onModuleInit(){
    this.roleService = this.moduleRef.get(RoleService, {strict: false});
  }

  async create(data: PermissionDTO){
    try{
      const permission = await this.permissionRepository.save(data);
      return permission;
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

  async update(id:string, data:Partial<PermissionDTO>){
    try{
      const permission = await this.permissionRepository.findOne({where: {id}});

      if(!permission){
        throw new HttpException('Permission not found', HttpStatus.NOT_FOUND);      
      }
      const affectedRow = await this.permissionRepository.update(id, data);

      return await this.findOne(id);
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

  async findOne(id: string){
    const permission = await this.permissionRepository.findOne({where: {id}, relations: ['role']});
    if(!permission){
      throw new HttpException('Permission not found', HttpStatus.NOT_FOUND);      
    }
    return permission;
  }

  async findAll(){
    const permissions = await this.permissionRepository.find({
      relations: ['role']
    });
    if(!permissions){
      throw new HttpException('Permission not found', HttpStatus.NOT_FOUND);      
    }
    return permissions;
  }

  async delete(id){
    try{
      const affectedRow = await this.permissionRepository.delete(id);
      return affectedRow;
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
