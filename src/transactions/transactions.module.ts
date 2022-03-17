import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { HelperService } from 'src/helper/helper.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, HelperService],
})
export class TransactionsModule {}
