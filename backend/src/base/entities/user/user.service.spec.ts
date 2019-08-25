import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserDTO } from './dto/user.dto';

jest.mock('./user.service.ts');
const userMockList: UserEntity[] = [
  {
    id: 'b623a864-f3e4-4916-ba31-c94527535bdf',
    createdDate: new Date(),
    updatedDate: new Date(),
    firstName: 'test',
    lastName: 'test 2',
    middleName: 't ',
    email: 'test@test.com',
    phoneNum: '12345678',
    status: true,
    version: 1,
    userAuth: null,
  },
];

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get one user', async () => {
    try {
      const userList: Promise<UserEntity[]> = new Promise((resolve, reject) => {
        resolve(userMockList);
      });
      jest.spyOn(service, 'showAll').mockResolvedValue(userList);
      const users = await service.showAll();
      expect(userMockList).toEqual(users);
      expect(users.length).toEqual(1);
    } catch (err) {
      expect(err).toBeFalsy();
    }
  });
});
