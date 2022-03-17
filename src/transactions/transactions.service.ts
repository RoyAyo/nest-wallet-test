import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/helper/helper.service';
import { User } from 'src/user/user.entity';
import { Connection, Repository } from 'typeorm';
import { sendMoneyDTO } from './dtos/transactions.dto';
import { Transactions } from './transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionRepo: Repository<Transactions>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly helpersService: HelperService,
    private connection: Connection,
  ) {}

  depositMoney(user: any) {
    console.log(user);
    //update user balance
  }

  async sendMoney(payload: sendMoneyDTO) {
    const { reference, amount, user } = payload;
    //find reference in User by username or phone number
    const referenceUser = await this.userRepo.findOne({
      where: [
        {
          username: reference,
        },
        {
          phone: reference,
        },
      ],
    });
    if (!referenceUser)
      throw new BadRequestException({
        message: 'Invalid user reference',
      });
    if (user.id === referenceUser.id)
      throw new BadRequestException({
        message: 'You cannot transfer funds to yourself',
      });
    if (user.balance < amount) {
      throw new BadRequestException({
        message: 'Insufficient Balance To Transfer funds',
      });
    }
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(
        User,
        { id: user.id },
        { balance: () => `balance - ${amount}` },
      );
      await queryRunner.manager.update(
        User,
        { id: referenceUser.id },
        { balance: () => `balance + ${amount}` },
      );
      const data = {
        senderId: user.id,
        receiverId: referenceUser.id,
        amount,
        description: 'Money sent successfully',
      };
      console.log(data);
      const transaction = queryRunner.manager.create(Transactions, data);
      await queryRunner.manager.save(transaction);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
    } finally {
      await queryRunner.release();
    }
    //create new wallet + for user and - for reference user
  }
}
