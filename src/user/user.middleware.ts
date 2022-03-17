import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { HelperService } from '../helper/helper.service';
import { User } from './user.entity';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly helperService: HelperService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer')
      )
        throw new UnauthorizedException({ message: 'User Not Authorized' });
      const token = req.headers.authorization.split(' ')[1];
      const payload = this.helperService.decodeToken(token);
      if (!payload)
        throw new UnauthorizedException({
          message: 'Invalid Token provided or Token expired',
        });
      console.log(payload.id);
      const user = await this.userRepo.findOne({ id: payload.id });
      if (!user)
        throw new UnauthorizedException({ message: 'You need to login first' });
      req.body.user = user;
      next();
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        message: error.message ?? 'You need to login first',
      });
    }
  }
}
