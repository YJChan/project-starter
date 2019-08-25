import { Injectable, HttpException, HttpStatus, OnModuleInit, Logger, Inject, forwardRef } from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { Repository, FindConditions, FindOneOptions, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDTO } from './dto/role.dto';
import { ModuleRef } from '@nestjs/core';
import { UserAuthEntity } from '../user-auth/user-auth.entity';

@Injectable()
export class RoleService implements OnModuleInit {

  // private userAuthService: UserAuthService;

  constructor(
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserAuthEntity) private userAuthRepository: Repository<UserAuthEntity>,
    // private moduleRef: ModuleRef,
  ) {

  }

  onModuleInit() {
    // this.userAuthService = this.moduleRef.get(UserAuthService, {strict: false});
  }

  async create(data: RoleDTO) {
    try {
      const role = await this.roleRepository.save(data);
      return role;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(relation: boolean = true) {
    const condition: FindManyOptions = {};

    if (relation) {
      condition.relations = ['permissions'];
    }
    const roles = await this.roleRepository.find(condition);
    return roles;
  }

  async findOne(id: string, relation: boolean = true) {
    const condition: FindOneOptions = {
      where: {id},
    };

    if (relation) {
      condition.relations = ['permissions'];
    }

    return await this.roleRepository.findOne(condition);
  }

  async update(id: string, roleToUpdate: Partial<RoleDTO>) {
    const role = await this.roleRepository.findOne({where: {id }});
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    const roleUpdated = await this.roleRepository.update({id}, roleToUpdate);

    return await this.findOne(id);
  }

  async delete(id: string) {
    Logger.log('req to delete role' + id);
    const userAuthWithThisRole = await this.userAuthRepository.find({
      where: {role: id},
    });
    Logger.log('number of role user attached, ' + userAuthWithThisRole.length);
    if (userAuthWithThisRole.length > 0) {
      throw new HttpException('There are users attached to this role, cannot be delete', HttpStatus.BAD_REQUEST);
    }
    const deletedRole = await this.roleRepository.delete(id);
    return deletedRole;
  }

}
