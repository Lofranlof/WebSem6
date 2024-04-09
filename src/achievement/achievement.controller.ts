import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from "@nestjs/common";
import { AchievementService } from './achievement.service';
import { CreateAchievementDTO } from './dto/create-achievement.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaginationParamsDto } from "../common/dto/pagination.dto";
import { UpdateAchievementDTO } from "./dto/update-achievement.dto";

@ApiBearerAuth()
@ApiTags('achievement')
@Controller('achievement')
export default class AchievementController {
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
  getAllAchievements(@Query() { offset, limit }: PaginationParamsDto) {
    return this.achievementService.getAllAchievements();
  }

  @ApiOperation({ summary: "Get an achievement by ID" })
  @ApiParam({name: "id", type: "integer", required: true})
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
  getAchievementByID(@Param('id') id: number) {
    return this.achievementService.getAchievementsByID(id);
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
  updateAchievement(@Body() achievement: UpdateAchievementDTO) {
    return this.achievementService.updateAchievement(achievement)
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
  async deleteAchievement(@Param('id') id: number) {
    this.achievementService.deleteAchievement(id);
  }
}
