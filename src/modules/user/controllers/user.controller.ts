import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { User } from '../schemas/user.shema';
import { CreateUserDto } from '../dtos/create-user-dto.dto';
import { UpdateUserDto } from '../dtos/update-user-dto.dto';

@ApiTags('Users') // Grouping the users endpoints under the "Users" tag in Swagger UI
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User has been successfully created.',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiBody({ type: CreateUserDto, description: 'The user data to create' })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Get a user by their ID number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully retrieved.',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({
    name: 'idNumber',
    type: String,
    description: 'The ID number of the user to retrieve',
    example: '123456789',
  })
  @Get(':idNumber')
  async getUserByIdNumber(@Param('idNumber') idNumber: string): Promise<User> {
    return this.userService.getUserByIdNumber(idNumber);
  }

  @ApiOperation({ summary: 'Retrieve a list of all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of users retrieved successfully.',
    type: [User],
  })
  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Update a user by their ID number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully updated.',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiParam({
    name: 'idNumber',
    type: String,
    description: 'The ID number of the user to update',
    example: '123456789',
  })
  @ApiBody({ type: UpdateUserDto, description: 'The user data to update' })
  @Put(':idNumber')
  async updateUser(
    @Param('idNumber') idNumber: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(idNumber, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user by their ID number' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({
    name: 'idNumber',
    type: String,
    description: 'The ID number of the user to delete',
    example: '123456789',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':idNumber')
  async deleteUser(@Param('idNumber') idNumber: string): Promise<void> {
    await this.userService.deleteUser(idNumber);
  }

  @ApiOperation({
    summary: 'Authenticate a user with biometrics, ID number, and OTP',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully authenticated.',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'Invalid credentials' })
  @ApiBody({
    type: LoginUserDto,
    description: 'User login data including biometrics, ID number, and OTP',
  })
  @Post('login')
  async authenticateUser(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return this.userService.authenticateUser(loginUserDto);
  }
}
