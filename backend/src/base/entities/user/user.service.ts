import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './dto/user.dto';
import { UserAuthDTO, UserAuthRO, RegisterUserAuthDTO } from '../user-auth/dto/user-auth.dto';
import { UserAuthEntity } from '../user-auth/user-auth.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(UserAuthEntity) private userAuthRepository: Repository<UserAuthEntity>
  ){    
  }

  async showAll(){
    return await this.userRepository.find();
  }

  async create(data: UserDTO){
    const user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }

  async read(id: string, relations: boolean = true){
    let condition = {
      where: {id: id}
    };
    if(relations){
      condition['relations'] = ['userAuth'];
    }

    const user = await this.userRepository.findOne(condition);

    if(!user){
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findUserAuth(condition: {}){    
    return await this.userRepository.findOne(condition);
  }  

  async update(id: string, data: Partial<UserDTO>){
    const user = await this.userRepository.update({id}, data);
    if(!user){
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return await this.read(id);
  }

  async removeUserAuth(id: string){
    let user = await this.userRepository.findOne({
      where: {id}
    });
    if(!user){
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    user.userAuth = null;
    user = await this.userRepository.save(user);
    return user;
  }

  async updateUserAuth(id: string, userAuthId: any){
    let user = await this.userRepository.findOne({
      where: {id}
    });
    if(!user){
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }    
    
    const userAuth = await this.userAuthRepository.findOne({
      where: {id: userAuthId}
    });
    
    user.userAuth = userAuth;

    const updatedUser = await this.userRepository.update(id, user);
    user = await this.userRepository.findOne({
      where: {id}
    });

    return user;
  }

  async delete(id: string){
    const user = await this.userRepository.delete({id});
    if(!user){
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

}
