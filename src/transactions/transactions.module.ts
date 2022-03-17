import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './transactions.entity';
// import { WalletModule } from 'src/wallet/wallet.module';
import { HelperModule } from '../helper/helper.module';
import { HelperService } from '../helper/helper.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    UserModule,
    // WalletModule,
    HelperModule,
    TypeOrmModule.forFeature([Transactions]),
    MailModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, HelperService],
})
export class TransactionsModule {}
