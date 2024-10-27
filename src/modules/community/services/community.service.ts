import { Injectable, NotFoundException } from '@nestjs/common';
import { DiscussionRepository } from '../repositories/discussion.repository';
import { MessageRepository } from '../repositories/message.repository';
import { CreateDiscussionDto } from '../dto/create-discussion.dto';
import { CreateMessageDto } from '../dto/create-message.dto';

@Injectable()
export class CommunityService {
  constructor(
    private readonly discussionRepository: DiscussionRepository,
    private readonly messageRepository: MessageRepository,
  ) {}

  // Create a discussion
  async createDiscussion(createDiscussionDto: CreateDiscussionDto) {
    return this.discussionRepository.create(createDiscussionDto);
  }

  // Create a message and add it to a discussion
  async createMessage(createMessageDto: CreateMessageDto) {
    const message = await this.messageRepository.create(createMessageDto);
    const discussion = await this.discussionRepository.addMessage(
      createMessageDto.discussionId,
      message._id as string,
    );
    if (!discussion) {
      throw new NotFoundException(
        `Discussion with ID ${createMessageDto.discussionId} not found`,
      );
    }
    return message;
  }

  // Find all discussions
  async findAllDiscussions() {
    return this.discussionRepository.findAll();
  }

  // Find all messages in a discussion
  async findMessagesInDiscussion(discussionId: string) {
    return this.messageRepository.findByDiscussionId(discussionId);
  }
}
