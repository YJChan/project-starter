import { Controller, Body, Post, UsePipes, Param, Put, Get, Delete } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeDTO } from './dto/code.dto';
import { Roles } from '../../user-auth/decorator/role.decorator';
import { Permission } from '../../user-auth/decorator/permission.decorator';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { CodeEntity } from './code.entity';

@Controller('api/code')
export class CodeController {
  
  constructor(private codeService: CodeService){

  }


  @Post()
  @Roles('master', 'admin')
  @Permission('*', 'createNewCode')
  @UsePipes(new ValidationPipe())
  async createCode(@Body() data: CodeDTO){
    return await this.codeService.create(data);
  }

  @Put(':id')
  @Roles('master', 'admin')
  @Permission('*', 'updateExistingCode')
  @UsePipes(new ValidationPipe())
  async updateCode(@Param('id') id: string, @Body() data: Partial<CodeDTO>){
    return await this.codeService.update(id, data);
  }

  @Get(':id')
  @Roles('master', 'admin', 'user')
  @Permission('*', 'getCode')
  async getCode(id: string){
    return await this.codeService.findOne(id);
  }
  
  @Get()
  @Roles('master', 'admin', 'user')
  @Permission('*', 'getAllCode')
  async getAllCodes(){
    return await this.codeService.findAll();
  }
  
  @Delete(':id')
  @Roles('master', 'admin')
  @Permission('*', 'deleteCode')
  async deleteCode(id: string){
    return await this.codeService.delete(id);
  }
}
