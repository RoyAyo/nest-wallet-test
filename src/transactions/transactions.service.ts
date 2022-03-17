import { Injectable } from '@nestjs/common';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class TransactionsService {
  constructor(private helpersService: HelperService) {}

  depositMoney(user: any) {
    console.log(user);
    //update user balance
  }

  sendMoney(user: any, payload: any) {
    const { reference, amount } = payload;
    //find reference in User by username or phone number
    //check if the user get the amount for en wallet balance
    //create a transaction
    //remove from user balance and add to reference user balance
    //create new wallet + for user and - for reference user
    //commit /abort transaction
    console.log(reference + amount);
  }
}
