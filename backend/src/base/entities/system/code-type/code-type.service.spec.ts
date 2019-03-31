import { Test, TestingModule } from '@nestjs/testing';
import { CodeTypeService } from './code-type.service';

describe('CodeTypeService', () => {
  let service: CodeTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeTypeService],
    }).compile();

    service = module.get<CodeTypeService>(CodeTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
