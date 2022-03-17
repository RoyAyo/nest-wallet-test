import { BadRequestException, Injectable } from '@nestjs/common';
import { HelperService } from 'src/helper/helper.service';
import { LoginUserDto, RegisterUserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly helpersService: HelperService) {}

  async registerUser(payload: RegisterUserDto) {
    const { email, password, fullName } = payload;
    const hashedPassword = this.helpersService.hashPassword(password);
    console.log(hashedPassword);
    console.log(email + fullName);
    const user: any = {};
    const _token = this.helpersService.encodeToken({ id: user.id });
    delete user.password;
    return {
      user,
      _token,
    };
  }

  async loginUser(payload: LoginUserDto) {
    const { email, password } = payload;
    const user: any = { email };
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
