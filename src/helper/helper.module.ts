import { Module } from '@nestjs/common';
import { HelperService } from './helper.service';

@Module({
  providers: [HelperService],
})
export class HelperModule {}
