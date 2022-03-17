import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async registerUser() {
    console.log(2);
  }

  async loginUser() {
    console.log(1);
  }

  async getCurrentUser() {
    console.log(1);
  }
}
