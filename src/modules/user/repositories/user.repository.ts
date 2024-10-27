import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.shema';
import { CreateUserDto } from '../dtos/create-user-dto.dto';
import { UpdateUserDto } from '../dtos/update-user-dto.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  // Find a user by ID number
  async findByIdNumber(idNumber: string): Promise<User | null> {
    return this.userModel.findOne({ idNumber }).exec();
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Find a user by username
  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Update a user by ID number
  async updateUser(
    idNumber: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate({ idNumber }, updateUserDto, { new: true })
      .exec();
  }

  // Delete a user by ID number
  async deleteUser(idNumber: string): Promise<User | null> {
    return this.userModel.findOneAndDelete({ idNumber }).exec();
  }

  // Authenticate a user with biometrics and OTP
  async authenticateUser(
    idNumber: string,
    biometrics: string,
    otp: string,
  ): Promise<User | null> {
    return this.userModel.findOne({ idNumber, biometrics, otp }).exec();
  }
}
