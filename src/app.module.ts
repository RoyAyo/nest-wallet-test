import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppConfigModule } from './config/app/app.module';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { HelperModule } from './helper/helper.module';
import { MailModule } from './mail/mail.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule,
    DatabaseModule,
    HelperModule,
    MailModule,
    TransactionsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
