import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';
import { HelperModule } from '../helper/helper.module';
import { HelperService } from '../helper/helper.service';
import { Transactions } from './transactions.entity';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService, HelperService],
      imports: [
        HelperModule,
        TypeOrmModule.forFeature([Transactions]),
        DatabaseModule,
        UserModule,
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
