import { Controller, Post, Get, Body, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Add a user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully added.' })
  @HttpCode(HttpStatus.CREATED)
  create (@Body() userData: User): Promise<User> {
    const user = new User();
    user.name = userData.name;
    return this.userService.createUser(userData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}