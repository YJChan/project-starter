import { Test, TestingModule } from '@nestjs/testing';
import { LoginTypeController } from './login-type.controller';

describe('LoginType Controller', () => {
  let controller: LoginTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginTypeController],
    }).compile();

    controller = module.get<LoginTypeController>(LoginTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
