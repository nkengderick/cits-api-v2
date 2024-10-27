import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CommunityService } from '../services/community.service';
import { CreateDiscussionDto } from '../dto/create-discussion.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Discussion } from '../schemas/discussion.schema';
import { Message } from '../schemas/message.schema';

@ApiTags('Community') // Swagger tag for this group of endpoints
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('discussions')
  @ApiOperation({ summary: 'Create a new discussion' }) // Swagger operation summary
  @ApiResponse({
    status: 201,
    description: 'The discussion has been created successfully.',
    type: Discussion,
  })
  @ApiBody({ type: CreateDiscussionDto }) // Describes the body schema for Swagger
  async createDiscussion(@Body() createDiscussionDto: CreateDiscussionDto) {
    return this.communityService.createDiscussion(createDiscussionDto);
  }

  @Post('messages')
  @ApiOperation({ summary: 'Create a new message in a discussion' }) // Swagger operation summary
  @ApiResponse({
    status: 201,
    description: 'The message has been created successfully.',
    type: Message,
  })
  @ApiBody({ type: CreateMessageDto }) // Describes the body schema for Swagger
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.communityService.createMessage(createMessageDto);
  }

  @Get('discussions')
  @ApiOperation({ summary: 'Retrieve all discussions' }) // Swagger operation summary
  @ApiResponse({
    status: 200,
    description: 'A list of discussions.',
    type: [Discussion],
  })
  async findAllDiscussions() {
    return this.communityService.findAllDiscussions();
  }

  @Get('discussions/:id/messages')
  @ApiOperation({ summary: 'Retrieve all messages in a specific discussion' }) // Swagger operation summary
  @ApiParam({ name: 'id', description: 'The ID of the discussion' }) // Describes the parameter for Swagger
  @ApiResponse({
    status: 200,
    description: 'A list of messages in the discussion.',
    type: [Message],
  })
  @ApiResponse({ status: 404, description: 'Discussion not found' }) // Swagger response status documentation
  async findMessagesInDiscussion(@Param('id') id: string) {
    return this.communityService.findMessagesInDiscussion(id);
  }
}
