import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from 'src/transactions/transactions.entity';
import { Wallet } from 'src/wallet/wallet.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'mac',
        password: 'mac',
        database: 'lazer-test',
        entities: [User, Transactions, Wallet],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
