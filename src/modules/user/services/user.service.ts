import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../schemas/user.shema';
import { CreateUserDto } from '../dtos/create-user-dto.dto';
import { UpdateUserDto } from '../dtos/update-user-dto.dto';
import { LoginUserDto } from '../dtos/login-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Check if the user already exists by email or idNumber
    const existingUserByEmail = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    const existingUserByIdNumber = await this.userRepository.findByIdNumber(
      createUserDto.idNumber,
    );

    if (existingUserByEmail || existingUserByIdNumber) {
      throw new BadRequestException(
        'User with this email or ID number already exists',
      );
    }

    return this.userRepository.createUser(createUserDto);
  }

  // Retrieve all users
  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  // Find a user by ID number
  async getUserByIdNumber(idNumber: string): Promise<User> {
    const user = await this.userRepository.findByIdNumber(idNumber);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Update a user by ID number
  async updateUser(
    idNumber: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.updateUser(idNumber, updateUserDto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Delete a user by ID number
  async deleteUser(idNumber: string): Promise<User> {
    const user = await this.userRepository.deleteUser(idNumber);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Authenticate user by biometrics, ID number, and OTP
  async authenticateUser(loginUserDto: LoginUserDto): Promise<User> {
    const { idNumber, biometrics, otp } = loginUserDto;
    const user = await this.userRepository.authenticateUser(
      idNumber,
      biometrics,
      otp,
    );
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    return user;
  }
}
