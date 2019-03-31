import { Injectable, HttpException, HttpStatus, OnModuleInit } from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDTO } from './dto/role.dto';
import { ModuleRef } from '@nestjs/core';
import { UserAuthService } from '../user-auth/user-auth.service';

@Injectable()
export class RoleService implements OnModuleInit{

  private userAuthService: UserAuthService;

  constructor(
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    private moduleRef: ModuleRef
  ){
    
  }

  onModuleInit(){
    this.userAuthService = this.moduleRef.get(UserAuthService, {strict: false});
  }

  async create(data: RoleDTO){
    const role = await this.roleRepository.save(data);
    return role;
  }

  async findAll(relation: boolean = true){
    let condition = {};

    if(relation){
      condition['relations'] = ['permissions'];
    }
    const roles = await this.roleRepository.find(condition);
    return roles;
  }  

  async findOne(id: string, relation: boolean = true){
    let condition = {
      where: {id}      
    };

    if(relation){
      condition['relations'] = ['permissions'];
    }

    return await this.roleRepository.findOne(condition);
  }

  async update(id: string, roleToUpdate: Partial<RoleDTO>){
    let role = await this.roleRepository.findOne({where: {id }});
    if(!role){
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    const roleUpdated = await this.roleRepository.update({id}, roleToUpdate);
    
    return await this.findOne(id);
  }

  async delete(id: string){
    console.log('req to delete role %s', id);
    const userAuthWithThisRole = await this.userAuthService.findRoleInUserAuth(id);
    console.log('role user attached %o', userAuthWithThisRole);
    if(userAuthWithThisRole.length > 0){
      throw new HttpException('User attached to this role, cannot be delete', HttpStatus.BAD_REQUEST);
    }
    const deletedRole = await this.roleRepository.delete(id);
    return deletedRole;
  }

}
