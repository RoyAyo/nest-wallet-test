import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { HelperService } from 'src/helper/helper.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './transactions.entity';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [UserModule, WalletModule, TypeOrmModule.forFeature([Transactions])],
  controllers: [TransactionsController],
  providers: [TransactionsService, HelperService],
})
export class TransactionsModule {}
