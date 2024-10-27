import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user-dto.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'new_securePassword123!', required: false })
  @IsString({ message: 'Password must be a string' })
  @IsOptional()
  password?: string;

  @ApiProperty({ example: '+237678901234', required: false })
  @IsString({ message: 'Phone number must be a string' })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ example: '123456789', required: false })
  @IsString({ message: 'ID number must be a string' })
  @IsOptional()
  idNumber?: string;

  @ApiProperty({ example: 'EncryptedBiometricDataHere', required: false })
  @IsString({ message: 'Biometrics must be an encrypted string' })
  @IsOptional()
  biometrics?: string;
}
