import { Test, TestingModule } from '@nestjs/testing';
import { HelperService } from '../helper/helper.service';
import { HelperModule } from '../helper/helper.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DatabaseModule } from '../database/database.module';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, HelperService],
      imports: [HelperModule, TypeOrmModule.forFeature([User]), DatabaseModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
