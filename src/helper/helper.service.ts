import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HelperService {
  SALT_ROUNDS = 10;
  JWT_TOKEN = process.env.JWT_TOKEN ?? '1234';

  hashPassword(password: string): string {
    const hashedPassword = bcrypt.hashSync(password, this.SALT_ROUNDS);
    return hashedPassword;
  }

  comparePassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  encodeToken(payload: any): string {
    const token = jwt.sign(payload, this.JWT_TOKEN, { expiresIn: '2 hours' });
    return token;
  }

  decodeToken(token: string): any {
    const payload = jwt.verify(token, this.JWT_TOKEN);
    return payload;
  }
}
