import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // useFactory: () => ({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'mac',
      password: 'mac',
      database: 'lazer-test',
      entities: [User],
      synchronize: true,
      // }),
    }),
  ],
})
export class DatabaseModule {}
