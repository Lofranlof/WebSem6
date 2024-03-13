import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get(':id')
  getUserByID(@Param('id') id: number) {
    return this.userService.getUserByID(id);
  }

  @Post()
  async createUser(@Body() user: UserDTO) {
    return this.userService.createUser(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    this.userService.deleteUser(id);
  }
}
