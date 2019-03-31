import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeTypeEntity } from './code-type.entity';
import { CodeTypeDTO } from './dto/code-type.dto';

@Injectable()
export class CodeTypeService {
  
  constructor(@InjectRepository(CodeTypeEntity) private codeTypeRepository: Repository<CodeTypeEntity>){

  }

  async create(data: CodeTypeDTO){
    try{
      const codeType = await this.codeTypeRepository.save(data);
      return codeType;
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

  async update(id: string, data: Partial<CodeTypeDTO>){
    try{
      const updatedCodeType = await this.codeTypeRepository.update(id, data);
      const codeType = await this.findOne(id);
      return codeType;
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

  async findOne(id: string, relation: boolean = true){
    let condition = {
      where : {id}
    };
    if(relation){
      condition['relations'] = ['codes'];
    }
    const codeType = await this.codeTypeRepository.findOne(condition);
    if(!codeType){
      throw new HttpException({message: 'Code type not found', errCode: 'CDETYPE.NOTFOUND'}, HttpStatus.NOT_FOUND);
    }
    return codeType;
  }

  async findAll(relation: boolean = true){
    let condition = {};
    if(relation){
      condition['relations'] = ['codes'];
    }
    const codeTypes = await this.codeTypeRepository.find(condition);
    if(!codeTypes){
      throw new HttpException({message: 'No code type available, create one?', errCode: 'CDETYPE.NOTAVAILABLE'}, HttpStatus.NOT_FOUND);
    }
    return codeTypes;
  }

  delete(id: string | string[]){
    try{
      const deletedCodeType = this.codeTypeRepository.delete(id);
      return deletedCodeType;
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
