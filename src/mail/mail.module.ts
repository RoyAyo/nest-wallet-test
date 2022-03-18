import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          secure: false,
          auth: {
            user: process.env.MAIL_USERNAME ?? 'roytest791@gmail.com',
            pass: process.env.MAIL_PASSWORD ?? 'testing-123',
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
