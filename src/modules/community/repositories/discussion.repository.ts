import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discussion, DiscussionDocument } from '../schemas/discussion.schema';
import { CreateDiscussionDto } from '../dto/create-discussion.dto';

@Injectable()
export class DiscussionRepository {
  constructor(
    @InjectModel(Discussion.name)
    private readonly discussionModel: Model<DiscussionDocument>,
  ) {}

  // Create a new discussion
  async create(createDiscussionDto: CreateDiscussionDto): Promise<Discussion> {
    const newDiscussion = new this.discussionModel(createDiscussionDto);
    return newDiscussion.save();
  }

  // Find all discussions
  async findAll(): Promise<Discussion[]> {
    return this.discussionModel
      .find()
      .populate('users')
      .populate('messages')
      .exec();
  }

  // Find a discussion by ID
  async findById(id: string): Promise<Discussion | null> {
    return this.discussionModel
      .findById(id)
      .populate('users')
      .populate('messages')
      .exec();
  }

  // Add a message to the discussion
  async addMessage(
    discussionId: string,
    messageId: string,
  ): Promise<Discussion | null> {
    return this.discussionModel
      .findByIdAndUpdate(
        discussionId,
        { $push: { messages: messageId } },
        { new: true },
      )
      .exec();
  }
}
