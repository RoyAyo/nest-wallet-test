import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HelperModule } from './helper/helper.module';
import { UserModule } from './user/user.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AppConfigModule } from './config/app/app.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    DatabaseModule,
    HelperModule,
    UserModule,
    TransactionsModule,
    AppConfigModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
