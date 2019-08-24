import { Test, TestingModule } from '@nestjs/testing';
import { LoginTypeService } from './login-type.service';

describe('LoginTypeService', () => {
  let service: LoginTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginTypeService],
    }).compile();

    service = module.get<LoginTypeService>(LoginTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
