import { Test, TestingModule } from '@nestjs/testing';
import { HelperService } from '../helper/helper.service';
import { HelperModule } from '../helper/helper.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        HelperService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
      imports: [HelperModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  // afterAll(async () => {
  //   await
  // });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should answer me first', () => {
    const fakePayload: any = {};
    expect(controller.registerUser(fakePayload)).toBeDefined();
  });
});
