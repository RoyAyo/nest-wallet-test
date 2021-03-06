import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transactions } from './transactions.entity';
import { TransactionsService } from './transactions.service';
import { User } from '../user/user.entity';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';

const userData = {
  id: 1,
  email: 'roy@mailinator.com',
  password: '1234',
  fullName: 'Ayo Roy',
  balance: 2000,
  phone: '08087019281',
  username: 'roy_lazer',
  created_at: new Date(),
  updated_at: new Date(),
};

describe('TransactionsService', () => {
  let service: TransactionsService;
  let userRepository: Repository<User>;
  let transactionsRepository: Repository<Transactions>;
  let connection: Connection;

  const qr = {
    manager: {},
  } as QueryRunner;

  class ConnectionMock {
    createQueryRunner(): QueryRunner {
      return qr;
    }
  }

  beforeEach(async () => {
    Object.assign(qr.manager, {
      update: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    });
    qr.connect = jest.fn();
    qr.release = jest.fn();
    qr.startTransaction = jest.fn();
    qr.commitTransaction = jest.fn();
    qr.rollbackTransaction = jest.fn();
    qr.release = jest.fn();

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
            findOne: jest.fn(() => ({
              ...userData,
              username: 'roy_test',
              balance: 100,
              id: 5,
            })),
          },
        },
        {
          provide: Connection,
          useClass: ConnectionMock,
        },
      ],
      imports: [MailModule],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    transactionsRepository = module.get<Repository<Transactions>>(
      getRepositoryToken(Transactions),
    );
    connection = module.get<Connection>(Connection);
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
});
