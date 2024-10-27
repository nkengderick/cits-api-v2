import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  async onModuleInit() {
    try {
      const dbUri = process.env.MONGO_DB_URI;
      this.logger.log(`Connecting to the database at: ${dbUri}`);

      await mongoose.connect(dbUri, {});
      this.logger.log('Database connected successfully');
    } catch (error) {
      this.logger.error('Failed to connect to the database', error.stack);
      process.exit(1);
    }
  }
}
