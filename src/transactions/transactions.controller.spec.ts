import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';
import { HelperModule } from '../helper/helper.module';
import { HelperService } from '../helper/helper.service';
import { TransactionsController } from './transactions.controller';
import { Transactions } from './transactions.entity';
import { TransactionsService } from './transactions.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Transactions]),
        HelperModule,
        DatabaseModule,
        UserModule,
      ],
      controllers: [TransactionsController],
      providers: [TransactionsService, HelperService],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
