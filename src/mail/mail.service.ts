import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async moneySentConfirmation(email: string, content: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Test App',
      text: content,
    });
  }
}
