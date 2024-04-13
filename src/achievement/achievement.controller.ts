import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  ParseIntPipe,
  NotFoundException, BadRequestException
} from "@nestjs/common";
import { AchievementService } from './achievement.service';
import { CreateAchievementDTO } from './dto/create-achievement.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaginationParamsDto } from "../common/dto/pagination.dto";
import { UpdateAchievementDTO } from "./dto/update-achievement.dto";

@ApiBearerAuth()
@ApiTags('achievement')
@Controller('achievement')
export default class AchievementController {
  MAX_INT32 = 2147483647
  constructor(private readonly achievementService: AchievementService) {}
  @ApiOperation({ summary: "Get all achievements" })
  @ApiQuery({ name: 'offset', type: 'number'})
  @ApiQuery({ name: 'limit', type: 'number'})
  @ApiResponse({
    status: 200,
    description: "All achievements have been fetched"
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
  async getAllAchievements(@Query() { offset, limit }: PaginationParamsDto) {
    if (offset > this.MAX_INT32 || offset < 0 || limit > this.MAX_INT32 || limit < 0) {
      throw new BadRequestException(`ID ${offset} or ${limit} is either too large or too small.`);
    }

    return this.achievementService.getAllAchievements(offset, limit);
  }

  @ApiOperation({ summary: "Get an achievement by ID" })
  @ApiParam({name: "id", type: "number", required: true})
  @ApiResponse({
    status: 200,
    description: "The achievement has been fetched"
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
  @Get(':id')
  async getAchievementByID(@Param('id', ParseIntPipe) id: number) {
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    const achievement = await this.achievementService.getAchievementsByID(id);
    if (!achievement) {
      throw new NotFoundException(`User with ${id} does not exist!`);
    }
    return achievement
  }

  @ApiOperation({ summary: "Create an achievement" })
  @ApiResponse({
    status: 201,
    description: "An achievement has been created successfully"
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
  async createAchievement(@Body() achievement: CreateAchievementDTO) {
    return this.achievementService.createAchievement(achievement);
  }

  @ApiOperation({ summary: "Update an achievement" })
  @ApiParam({name: "id", type: "integer", required: true})
  @ApiResponse({
    status: 200,
    description: "An achievement has been updated successfully"
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
  async updateAchievement(@Param('id', ParseIntPipe) id: number,@Body() achievement: UpdateAchievementDTO) {
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    return this.achievementService.updateAchievement(id, achievement)
  }

  @ApiOperation({ summary: "Delete an achievement" })
  @ApiParam({name: "id", type: "integer", required: true})
  @ApiResponse({
    status: 200,
    description: "An achievement has been deleted successfully"
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
  async deleteAchievement(@Param('id', ParseIntPipe) id: number) {
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    return this.achievementService.deleteAchievement(id);
  }
}
