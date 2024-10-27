import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MessageDocument = Message & Document;

@Schema()
export class Message extends Document {
  @ApiProperty({
    description: 'The ID of the discussion this message belongs to',
    example: '6123abc12345def6789',
  })
  @Prop({ type: Types.ObjectId, ref: 'Discussion', required: true })
  discussionId: Types.ObjectId;

  @ApiProperty({
    description: 'The ID of the user who created the message',
    example: 'userId123',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @ApiProperty({
    description: 'The content of the message',
    example: 'This is the content of the message',
  })
  @Prop({ required: true })
  content: string;

  @ApiProperty({
    description: 'The timestamp of when the message was sent',
    example: '2024-10-12T10:00:00Z',
  })
  @Prop({ default: Date.now })
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
