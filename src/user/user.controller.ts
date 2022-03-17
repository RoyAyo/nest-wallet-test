import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async registerUser() {
    await this.userService.getCurrentUser();
    return {
      message: 'Nice work',
    };
  }

  @Post('/')
  async loginUser() {
    await this.userService.getCurrentUser();
    return {
      message: 'Nice work',
    };
  }

  @Get('/')
  async getCurrentUser() {
    await this.userService.getCurrentUser();
    return {
      message: 'Nice work',
    };
  }
}
