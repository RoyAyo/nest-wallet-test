import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DatabaseModule } from '../src/database/database.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/user.entity';
import { UserModule } from '../src/user/user.module';
// import { UserService } from '../src/user/user.service';
import { Repository } from 'typeorm';

const data = {
  email: 'roy@mailinator.com',
  password: '1234',
  fullName: 'Ayo Roy',
  phone: '08087019281',
  username: 'roy_lazer',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, UserModule],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get('UserRepository');
    userRepository.delete({});
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
        .send(JSON.stringify(data));

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
      const newUser = {
        ...data,
        email: 'test@mailinator.com',
        phone: '09092019201',
        username: 'tester',
      };
      await request(app.getHttpServer())
        .post('/user/register')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(newUser));

      await request(app.getHttpServer())
        .post('/user/register')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(newUser));

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
        .send(JSON.stringify({ email: data.email, password: '123949' }));

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
        .send(JSON.stringify({ email: data.email, password: data.password }));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data._token');
    });
  });
});
