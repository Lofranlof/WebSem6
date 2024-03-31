import { Body, Controller, Delete, Get, Param, Post , Patch} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "All users have been fetched"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: "Get user by ID" })
  @ApiParam({name: "id", type: "integer", required: true})
  @ApiResponse({
    status: 200,
    description: "User has been fetched"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Get(':id')
  getUserByID(@Param('id') id: number) {
    return this.userService.getUserByID(id);
  }
  @ApiOperation({ summary: "Create new user" })
  @ApiResponse({
    status: 201,
    description: "User has been created successfully"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Post()
  createUser(@Body() user: UserDTO) {
    return this.userService.createUser(user);
  }

  @ApiOperation({ summary: "Update the user information" })
  @ApiParam({name: "id", type: "integer", required: true})
  @ApiResponse({
    status: 200,
    description: "User information has been updated successfully"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body()user: UserDTO) {
    return this.userService.updateUser(user);
  }

  @ApiOperation({ summary: "Delete the user" })
  @ApiParam({name: "id", type: "integer", required: true})
  @ApiResponse({
    status: 200,
    description: "User has been deleted successfully"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    this.userService.deleteUser(id);
  }
}
