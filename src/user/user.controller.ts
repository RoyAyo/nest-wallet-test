import {
  Controller,
  Get,
  Post,
  ValidationPipe as NestValidationPipe,
  UsePipes,
  Body,
} from '@nestjs/common';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { LoginUserDto, RegisterUserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { RegisterUserValidation, LoginUserValidation } from './user.validation';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(
    new ValidationPipe(RegisterUserValidation),
    new NestValidationPipe({ transform: true }),
  )
  @Post('/register')
  async registerUser(@Body() payload: RegisterUserDto) {
    const data = await this.userService.registerUser(payload);
    return {
      message: 'User created successfully',
      data,
    };
  }

  @UsePipes(
    new ValidationPipe(LoginUserValidation),
    new NestValidationPipe({ transform: true }),
  )
  @Post('/login')
  async loginUser(@Body() payload: LoginUserDto) {
    const data = await this.userService.loginUser(payload);
    return {
      data,
    };
  }

  @Get('/me')
  async getCurrentUser(@Body('user') user: User) {
    return {
      data: user,
    };
  }
}
