import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  ParseIntPipe,
  NotFoundException,
  Query
} from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { PaginationParamsDto } from "../common/dto/pagination.dto";

@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Get all users" })
  @ApiQuery({ name: 'offset', type: 'number'})
  @ApiQuery({ name: 'limit', type: 'number'})

  @ApiResponse({
    status: 200,
    description: "All users have been fetched"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 400,
    description: "Bad request"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Get()
  async getAllUsers(@Query() { offset, limit }: PaginationParamsDto) {
    return this.userService.getAllUsers(offset, limit);
  }

  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({
    status: 200,
    description: "User has been fetched"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 400,
    description: "Bad request"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @ApiResponse({
    status: 404,
    description: "Not Found"
  })
  @Get(':id')
  async getUserByID(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserByID(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist!`);
    }
    return user;
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
    status: 400,
    description: "Bad request"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }

  @ApiOperation({ summary: "Update the user information" })
  @ApiResponse({
    status: 200,
    description: "User information has been updated successfully"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 400,
    description: "Bad request"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDTO: UpdateUserDTO) {
    return this.userService.updateUser(id, updateUserDTO);
  }

  @ApiOperation({ summary: "Delete the user" })
  @ApiResponse({
    status: 200,
    description: "User has been deleted successfully"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 400,
    description: "Bad request"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
