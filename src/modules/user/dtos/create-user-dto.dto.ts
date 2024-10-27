import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { Role } from '../schemas/user.shema';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @ApiProperty({ example: 'john_doe@example.com' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({ example: 'EncryptedBiometricDataHere' })
  @IsString({ message: 'Biometrics must be an encrypted string' })
  @IsNotEmpty({ message: 'Biometrics data is required' })
  biometrics: string;

  @ApiProperty({ example: '12345' })
  @Matches(/^\d{5}$/, { message: 'OTP must be a 5-digit number' })
  otp: string;

  @ApiProperty({ example: '+237612345678' })
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;

  @ApiProperty({ example: '123456789' })
  @IsString({ message: 'ID number must be a string' })
  @IsNotEmpty({ message: 'ID number is required' })
  idNumber: string;

  @ApiProperty({
    enum: Role,
    example: Role.CITIZEN,
  })
  @IsEnum(Role, {
    message:
      'Role must be one of "citizen", "governmentOfficial", "serviceProvider", or "admin"',
  })
  role: Role;
}
