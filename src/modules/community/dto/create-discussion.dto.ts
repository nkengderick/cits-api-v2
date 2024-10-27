import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateDiscussionDto {
  @ApiProperty({
    description: 'The topic of the discussion',
    example: 'Best programming languages',
  })
  @IsString({ message: 'Topic must be a string' })
  @IsNotEmpty({ message: 'Topic is required' })
  topic: string;

  @ApiProperty({
    description: 'The IDs of users participating in the discussion',
    type: [String],
    example: ['userId123', 'userId456'],
  })
  @IsArray({ message: 'Users must be an array' })
  users: string[];
}
