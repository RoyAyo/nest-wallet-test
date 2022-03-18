import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe as NestValidationPipe,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { sendMoneyDTO } from './dtos/transactions.dto';
import { TransactionsService } from './transactions.service';
import {
  DepositMoneyValidation,
  SendMoneyValidation,
} from './transactions.valitation';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/')
  async getTransactions() {
    return {
      message: 'Working',
    };
  }

  @UsePipes(
    new ValidationPipe(DepositMoneyValidation),
    new NestValidationPipe({ transform: true }),
  )
  @Post('/deposit')
  @HttpCode(200)
  async depositMoney(@Body() payload: any) {
    await this.transactionsService.depositMoney(payload);
    return {
      message: 'Successfully deposited funds',
    };
  }

  @UsePipes(
    new ValidationPipe(SendMoneyValidation),
    new NestValidationPipe({ transform: true }),
  )
  @Post('/')
  @HttpCode(200)
  async sendMoney(@Body() payload: sendMoneyDTO) {
    await this.transactionsService.sendMoney(payload);
    return {
      message: 'Funds successfully sent',
    };
  }
}
