import { Test } from '@nestjs/testing';
import { LoginTypeService } from './login-type.service';
import { LoginTypeDTO } from './dto/login-type.dto';
import { Repository, getRepository, getConnection } from 'typeorm';
import { LoginTypeEntity } from './login-type.entity';
import { UserAuthEntity } from '../user-auth/user-auth.entity';
import { UserEntity } from '../user/user.entity';
import { RoleEntity } from '../role/role.entity';
import { UserAuthService } from '../user-auth/user-auth.service';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import {createConnection, Connection} from 'typeorm';

describe('LoginTypeService', () => {
  let service: LoginTypeService;
  let loginTypeDTO: LoginTypeDTO;
  const loginTypeRepository: Repository<LoginTypeEntity> = new Repository<LoginTypeEntity>();
  const userAuthRepository: Repository<UserAuthEntity> = new Repository<UserAuthEntity>();
  const userRepository: Repository<UserEntity> = new Repository<UserEntity>();
  const roleRepository: Repository<RoleEntity> = new Repository<RoleEntity>();
  const userService: UserService = new UserService(userRepository, userAuthRepository);
  const roleService: RoleService = new RoleService(roleRepository, userAuthRepository);
  const userAuthService: UserAuthService = new UserAuthService(userAuthRepository, userService, roleService);
  let loginTypeRepo;
  beforeAll(async () => {
    const connection = await createConnection({
      name: 'test_default',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [LoginTypeEntity],
    });
  });

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [TypeOrmModule.forFeature([LoginTypeEntity]), forwardRef(() => UserAuthModule)],
    //   providers: [
    //     LoginTypeService,
    //   ],
    // }).compile();

    loginTypeRepo = getConnection('test_default').getRepository(LoginTypeEntity);
    service = new LoginTypeService(loginTypeRepo, userAuthService);
    loginTypeDTO = new LoginTypeDTO();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get all login type', async () => {
    try {
      const result = await service.findAll();
      expect(result.length).toBeGreaterThan(0);
    } catch (err) {
      // console.log('cannot find any login type ', err);
      expect(err).toEqual('login type not created');
    }
  });

  it('should create new login type', async () => {
    try {
      loginTypeDTO = new LoginTypeDTO();
      loginTypeDTO.name = 'testing';
      const result = await service.create(loginTypeDTO);
      expect(result.name).toEqual('testing');
    } catch (err) {
      expect(err).toEqual('login type not created');
    }
  });
});
