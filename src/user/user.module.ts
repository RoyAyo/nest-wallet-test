import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMiddleware } from './user.middleware';
import { HelperModule } from '../helper/helper.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HelperModule],
  controllers: [UserController],
  providers: [UserService, UserMiddleware],
  exports: [TypeOrmModule],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('/user/me');
    consumer.apply(UserMiddleware).forRoutes('/transactions');
  }
}
