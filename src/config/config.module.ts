import { Module } from '@nestjs/common';
import { AppConfigModule } from './app/app.module';

/**
 * Import configurations required here.
 *
 * @module
 */
@Module({
  imports: [AppConfigModule],
})
export class ConfigModule {}
