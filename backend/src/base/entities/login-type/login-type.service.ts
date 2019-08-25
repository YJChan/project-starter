import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { LoginTypeEntity } from './login-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginTypeDTO } from './dto/login-type.dto';
import { UserAuthService } from '../user-auth/user-auth.service';

@Injectable()
export class LoginTypeService {

  constructor(
    @InjectRepository(LoginTypeEntity) private loginTypeRepository: Repository<LoginTypeEntity>,
    private userAuthService: UserAuthService,
  ) {
  }

  async create(data: LoginTypeDTO): Promise<LoginTypeDTO> {
    try {
      const loginType = await this.loginTypeRepository.save(data);
      return loginType;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, data: Partial<LoginTypeDTO>): Promise<LoginTypeDTO> {
    try {
      const loginType = await this.loginTypeRepository.findOne({where: id});
      if (!loginType) {
        throw new HttpException('Login Type not found', HttpStatus.NOT_FOUND);
      }
      const loginTypeUpdated = await this.loginTypeRepository.update({id}, data);
      return await this.loginTypeRepository.findOne({where: id});
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    const options: FindOneOptions = {
      where: {id},
    };

    return await this.loginTypeRepository.findOne(options);
  }

  async findAll() {
    return await this.loginTypeRepository.find();
  }

  async delete(id: string) {
    Logger.log('delete login type with id: ', id);
    try {
      const authWithLoginType = await this.userAuthService.findAuthWithLoginTypeId(id);
      if (authWithLoginType.length > 0) {
        throw new HttpException(
          'There are authentication using current login type, failed to delete it.',
          HttpStatus.BAD_REQUEST,
        );
      }
      const loginType = await this.loginTypeRepository.delete({id});
      return loginType;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

}
