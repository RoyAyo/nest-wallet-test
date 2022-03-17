import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from '../helper/helper.service';
import { Repository } from 'typeorm';
import { LoginUserDto, RegisterUserDto } from './dtos/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly helpersService: HelperService,
  ) {}

  async registerUser(payload: RegisterUserDto) {
    const { password } = payload;
    const hashedPassword = this.helpersService.hashPassword(password);
    const data = {
      ...payload,
      password: hashedPassword,
    };
    const user = this.userRepo.create(data);
    await this.userRepo.save(data);
    const _token = this.helpersService.encodeToken({ id: user.id });
    delete user.password;
    return {
      user,
      _token,
    };
  }

  async loginUser(payload: LoginUserDto) {
    const { email, password } = payload;
    const user = await this.userRepo.findOne({
      email,
    });
    if (!user)
      throw new BadRequestException({
        message: 'Invalid Credentials Provided',
      });
    const isValidCredential = this.helpersService.comparePassword(
      password,
      user.password,
    );
    if (!isValidCredential)
      throw new BadRequestException({
        message: 'Invalid Credentials Provided',
      });
    const _token = this.helpersService.encodeToken({ id: user.id });
    delete user.password;
    return {
      user,
      _token,
    };
  }

  async getCurrentUser() {
    console.log(1);
  }
}
