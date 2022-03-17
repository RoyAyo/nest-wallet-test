import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe as NestValidationPipe,
  Body,
} from '@nestjs/common';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { sendMoneyDTO } from './dtos/transactions.dto';
import { TransactionsService } from './transactions.service';
import { SendMoneyValidation } from './transactions.valitation';

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
    new ValidationPipe(SendMoneyValidation),
    new NestValidationPipe({ transform: true }),
  )
  @Post('/')
  async sendMoney(@Body() payload: sendMoneyDTO) {
    const message = await this.transactionsService.sendMoney(payload);
    return {
      data: message,
    };
  }
}
