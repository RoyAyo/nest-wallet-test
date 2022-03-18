import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from '../transactions/transactions.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: process.env.DATABASE_USERNAME ?? 'mac',
        password: process.env.DATABASE_PASSWORD ?? 'mac',
        database:
          process.env.NODE_ENV === 'test'
            ? process.env.DATABASE_TEST
            : process.env.DATABASE ?? 'lazer-test',
        entities: [User, Transactions],
        synchronize: process.env.NODE_ENV !== 'production',
        keepConnectionAlive: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
