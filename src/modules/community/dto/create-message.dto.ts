import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'The content of the message',
    example: 'I think Python is the best.',
  })
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @ApiProperty({
    description: 'The ID of the discussion this message belongs to',
    example: '6123abc12345def6789',
  })
  @IsString({ message: 'Discussion ID must be a string' })
  @IsNotEmpty({ message: 'Discussion ID is required' })
  discussionId: string;

  @ApiProperty({
    description: 'The ID of the user sending the message',
    example: 'userId123',
  })
  @IsString({ message: 'User ID must be a string' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;
}
