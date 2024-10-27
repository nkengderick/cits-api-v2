import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CommunityModule } from './modules/community/community.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getDatabaseConfig } from './common/config/database.config';
import { DatabaseService } from './common/services/database.service';
import { DocumentModule } from './modules/document/document.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: getDatabaseConfig,
    }),
    UserModule,
    DocumentModule,
    CommunityModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'documents'), // Expose the documents folder
      serveRoot: '/documents', // Serve files at http://localhost:3000/documents
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
