import { Module } from '@nestjs/common';
import { AppConfigModule } from './app/app.module';

/**
 * Import and provide database configuration related classes.
 *
 * @module
 */
@Module({
  imports: [AppConfigModule],
})
export class ConfigModule {}
