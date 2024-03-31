import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementDTO } from './dto/create-achievement.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('achievement')
@Controller('achievement')
export default class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}
  @ApiOperation({ summary: "Get all achievements" })
  @ApiResponse({
    status: 200,
    description: "All achievements have been fetched"
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
  getAllAchievements() {
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
    status: 500,
    description: "Internal error"
  })
  @Post()
  async createAchievement(@Body() achievement: AchievementDTO) {
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
    status: 500,
    description: "Internal error"
  })
  @Patch(':id')
  updateAchievement(@Body() achievement: AchievementDTO) {
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
    status: 500,
    description: "Internal error"
  })
  @Delete(':id')
  async deleteAchievement(@Param('id') id: number) {
    this.achievementService.deleteAchievement(id);
  }
}
