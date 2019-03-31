import { Test, TestingModule } from '@nestjs/testing';
import { CodeTypeController } from './code-type.controller';

describe('CodeType Controller', () => {
  let controller: CodeTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeTypeController],
    }).compile();

    controller = module.get<CodeTypeController>(CodeTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
