import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  CITIZEN = 'citizen',
  GOVERNMENT_OFFICIAL = 'governmentOfficial',
  SERVICE_PROVIDER = 'serviceProvider',
  ADMIN = 'admin',
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({
    description: 'Unique username for the user',
    example: 'john_doe',
  })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({
    description: 'Unique email for the user',
    example: 'john_doe@example.com',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'User’s national or ID number',
    example: '123456789',
  })
  @Prop({ required: true, unique: true })
  idNumber: string;

  @ApiProperty({
    description: 'One-time password (OTP) for verification',
    example: '123456',
  })
  @Prop()
  otp: string;

  @ApiProperty({
    description: 'Biometric data for user authentication',
    example: 'EncryptedBiometricDataHere',
  })
  @Prop({ required: true })
  biometrics: string; // This should be securely encrypted in practice

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+237612345678',
  })
  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @ApiProperty({
    description:
      'Role of the user (citizen, government official, service provider, or admin)',
    enum: Role,
    example: Role.CITIZEN,
    default: Role.CITIZEN,
  })
  @Prop({ required: true, enum: Role, default: Role.CITIZEN })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
