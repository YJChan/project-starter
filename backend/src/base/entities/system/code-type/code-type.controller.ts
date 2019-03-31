import { Controller, Body, Post, UsePipes, Put, Param, Get, Delete } from '@nestjs/common';
import { CodeTypeDTO } from './dto/code-type.dto';
import { Roles } from '../../user-auth/decorator/role.decorator';
import { Permission } from '../../user-auth/decorator/permission.decorator';
import { CodeTypeService } from './code-type.service';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('api/code-type')
export class CodeTypeController {
  constructor(private codeTypeService: CodeTypeService){

  }

  @Post()
  @Roles('master', 'admin')
  @Permission('*', 'createNewCodeType')
  @UsePipes(new ValidationPipe())
  async createCodeType(@Body() data: CodeTypeDTO){
    const codeType = await this.codeTypeService.create(data);
    return codeType;
  }

  @Put(':id')
  @Roles('master', 'admin')
  @Permission('*', 'updateExistingCodeType')
  @UsePipes(new ValidationPipe())
  async updateCodeType(@Param('id') id: string, @Body() data: Partial<CodeTypeDTO>){
    return await this.codeTypeService.update(id, data);    
  }

  @Get(':id')
  @Roles('master', 'admin', 'user')
  @Permission('*', 'getCodeType')
  async getCodeType(@Param('id') id: string){
    return await this.codeTypeService.findOne(id);
  }

  @Get()
  @Roles('master', 'admin', 'user')
  @Permission('*', 'getAllCodeType')
  async getAllCodeType(){
    return await this.codeTypeService.findAll();
  }

  @Delete(':id')
  @Roles('master', 'admin')
  @Permission('*', 'deleteCodeType')
  async deleteCodeType(@Param('id') id: string){
    return await this.codeTypeService.delete(id);
  }
}
