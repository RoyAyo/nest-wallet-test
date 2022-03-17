import { User } from 'src/user/user.entity';

export class sendMoneyDTO {
  reference: string;

  amount: number;

  user: User;
}
