import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Message } from './message.schema';

export type DiscussionDocument = Discussion & Document;

@Schema()
export class Discussion extends Document {
  @ApiProperty({
    description: 'The topic of the discussion',
    example: 'Best programming languages in 2024',
  })
  @Prop({ required: true })
  topic: string;

  @ApiProperty({
    description: 'The users participating in the discussion',
    type: [String],
    example: ['userId123', 'userId456'],
  })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  users: Types.ObjectId[];

  @ApiProperty({
    description: 'The messages in this discussion',
    type: [Message],
  })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages: Types.ObjectId[];
}

export const DiscussionSchema = SchemaFactory.createForClass(Discussion);
