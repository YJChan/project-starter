import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeDTO } from './dto/code.dto';
import { Repository } from 'typeorm';
import { CodeEntity } from './code.entity';

@Injectable()
export class CodeService {

  constructor(@InjectRepository(CodeEntity) private codeRepository: Repository<CodeEntity>){

  }

  async create(data: CodeDTO){
    try{
      return await this.codeRepository.save(data);
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

  async update(id: string, data: Partial<CodeDTO>){
    try{
      const updatedCode = await this.codeRepository.update(id, data);
      const code = await this.codeRepository.findOne({where: {id}});
      return code;
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
    const code = await this.codeRepository.findOne({where: {id}});
    return code;
  }

  async findAll(){
    return await this.codeRepository.find();
  }

  async delete(id: string){
    try{
      return await this.codeRepository.delete(id);
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
