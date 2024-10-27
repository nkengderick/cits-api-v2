import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunityController } from './controllers/community.controller';
import { CommunityService } from './services/community.service';
import { DiscussionRepository } from './repositories/discussion.repository';
import { MessageRepository } from './repositories/message.repository';
import { Discussion, DiscussionSchema } from './schemas/discussion.schema';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Discussion.name, schema: DiscussionSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [CommunityController],
  providers: [CommunityService, DiscussionRepository, MessageRepository],
  exports: [CommunityService, DiscussionRepository, MessageRepository],
})
export class CommunityModule {}
