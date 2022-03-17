export class RegisterUserDto {
  fullName: string;

  email: string;

  password: string;

  phone: string;

  username: string;
}

export class LoginUserDto {
  email: string;

  password: string;
}
