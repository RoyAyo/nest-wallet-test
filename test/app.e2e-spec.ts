import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DatabaseModule } from '../src/database/database.module';
import { User } from '../src/user/user.entity';
import { UserModule } from '../src/user/user.module';
import { Repository } from 'typeorm';
import { Transactions } from '../src/transactions/transactions.entity';
import { TransactionsModule } from '../src/transactions/transactions.module';

const user1 = {
  email: 'roy@mailinator.com',
  password: '1234',
  fullName: 'Ayo Roy',
  phone: '08087019281',
  username: 'roy_lazer',
};
const user2 = {
  ...user1,
  email: 'test@mailinator.com',
  phone: '09092019201',
  username: 'tester',
};

// eslint-disable-next-line no-var
var authToken: string;

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let transactionRepository: Repository<Transactions>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, UserModule, TransactionsModule],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get('UserRepository');
    transactionRepository = moduleFixture.get('TransactionsRepository');
    userRepository.delete({});
    transactionRepository.delete({});
    await app.init();
  });

  afterAll(async () => {
    userRepository.delete({});
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/register (POST)', () => {
    it('should return 400 without appropriate data', () => {
      return request(app.getHttpServer()).post('/user/register').expect(400);
    });

    it('should return 201 with appropriate data and add to the database', async () => {
      const response = await request(app.getHttpServer())
        .post('/user/register')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(user1));

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('data._token');
      expect(response.body).toHaveProperty('data.user');
      expect(await userRepository.count({})).toBe(1);
      expect(await userRepository.findOne({})).toHaveProperty(
        'email',
        'roy@mailinator.com',
      );
    });

    it('should return add only the first data and fail when adding the same data for email etc multiple times', async () => {
      //add the data initially
      await request(app.getHttpServer())
        .post('/user/register')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(user2));

      await request(app.getHttpServer())
        .post('/user/register')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(user2));

      //i.e add only one of the data
      expect(await userRepository.count()).toBe(2);
    });
  });

  describe('/login (POST)', () => {
    it('should return 400 without appropriate data', () => {
      return request(app.getHttpServer()).post('/user/login').expect(400);
    });

    it('should return 400 with invalid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/user/login')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ email: user1.email, password: '123949' }));

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'message',
        'Invalid Credentials Provided',
      );
    });

    it('should return 200 with valid credentials and token', async () => {
      const response = await request(app.getHttpServer())
        .post('/user/login')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ email: user1.email, password: user1.password }));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data._token');
      authToken = response.body.data._token;
    });
  });

  describe('/transactions SEND MONEY (POST)', () => {
    beforeAll(async () => {
      await userRepository.update({ email: user1.email }, { balance: 1000 });
    });

    it('should return 401 without authentication', () => {
      return request(app.getHttpServer()).post('/transactions').expect(401);
    });

    it('should return 400 without appropriate data', () => {
      return request(app.getHttpServer())
        .post('/transactions')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400);
    });

    it('should return 400 when user has insufficient balance', async () => {
      const response = await request(app.getHttpServer())
        .post('/transactions')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send(JSON.stringify({ reference: user2.username, amount: 10000 }));

      expect(response.status).toBe(400);
    });

    it('should return 400 when user tries to send funds to himself', async () => {
      const response = await request(app.getHttpServer())
        .post('/transactions')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send(JSON.stringify({ reference: user1.username, amount: 100 }));

      expect(response.status).toBe(400);
    });

    it('should return 200 and successfully send funds when you use username as reference', async () => {
      const response = await request(app.getHttpServer())
        .post('/transactions')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send(JSON.stringify({ reference: user2.username, amount: 100 }));

      expect(response.status).toBe(200);
      expect(
        await userRepository.findOne({ email: user1.email }),
      ).toHaveProperty('balance', 900);
      expect(
        await userRepository.findOne({ email: user2.email }),
      ).toHaveProperty('balance', 100);
      expect(await transactionRepository.count()).toBe(1);
    });

    it('should return 200 and successfully send funds when you use phone as reference', async () => {
      const response = await request(app.getHttpServer())
        .post('/transactions')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send(JSON.stringify({ reference: user2.phone, amount: 200 }));

      expect(response.status).toBe(200);
      expect(
        await userRepository.findOne({ email: user1.email }),
      ).toHaveProperty('balance', 700);
      expect(
        await userRepository.findOne({ email: user2.email }),
      ).toHaveProperty('balance', 300);
      expect(await transactionRepository.count()).toBe(2);
    });
  });
});
