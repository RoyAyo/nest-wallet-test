import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transactions } from './transactions.entity';
import { TransactionsService } from './transactions.service';
import { User } from '../user/user.entity';
import { Connection, Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let userRepository: Repository<User>;
  let transactionsRepository: Repository<Transactions>;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        MailService,
        {
          provide: getRepositoryToken(Transactions),
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: Connection,
          useValue: {
            createQueryRunner: jest.fn(),
          },
        },
      ],
      imports: [MailModule],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    transactionsRepository = module.get<Repository<Transactions>>(
      getRepositoryToken(Transactions),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('transactions Repository be defined', () => {
    expect(transactionsRepository).toBeDefined();
  });

  it('user Repository be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('sendMoney', () => {
    it('should fail on invalid details provided', () => {});
  });
});
