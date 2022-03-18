import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HelperModule } from '../helper/helper.module';
import { HelperService } from '../helper/helper.service';
import { LoginUserDto, RegisterUserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

const userData = {
  id: 1,
  email: 'roy@mailinator.com',
  password: '1234',
  fullName: 'Ayo Roy',
  phone: '08087019281',
  username: 'roy_lazer',
};

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        HelperService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(() => userData),
            save: jest.fn(),
            findOne: jest.fn(() => userData),
            update: jest.fn(),
          },
        },
      ],
      imports: [HelperModule],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('user Repository be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('registerUser', () => {
    jest.spyOn(HelperService.prototype, 'hashPassword').mockReturnValue('1234');
    const data: RegisterUserDto = {
      email: 'roy@mailinator.com',
      password: '1234',
      fullName: 'Ayo Roy',
      phone: '08087019281',
      username: 'roy_lazer',
    };
    it('should call userRepo.create with correct data', async () => {
      await service.registerUser(data);
      expect(userRepository.create).toHaveBeenCalledWith(data);
    });

    it('should call userRepo.save with correct params', async () => {
      await service.registerUser(data);
      expect(userRepository.save).toBeCalled();
      expect(userRepository.save).toHaveBeenCalledWith(data);
    });
  });

  describe('loginUser', () => {
    jest
      .spyOn(HelperService.prototype, 'comparePassword')
      .mockReturnValue(true);
    jest.spyOn(HelperService.prototype, 'hashPassword').mockReturnValue('1234');
    const data: LoginUserDto = {
      email: 'roy@mailinator.com',
      password: '12345678',
    };
    it('should call userRepo.findOne with the email', async () => {
      await service.loginUser(data);
      expect(userRepository.findOne).toBeCalledWith({
        email: data.email,
      });
    });
  });
});
