import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'EncryptedBiometricDataHere' })
  @IsString({ message: 'Biometrics must be an encrypted string' })
  @IsNotEmpty({ message: 'Biometrics data is required' })
  biometrics: string;

  @ApiProperty({ example: '123456789' })
  @IsString({ message: 'ID number must be a string' })
  @IsNotEmpty({ message: 'ID number is required' })
  idNumber: string;

  @ApiProperty({ example: '12345' })
  @Matches(/^\d{5}$/, { message: 'OTP must be a 5-digit number' })
  otp: string;
}
