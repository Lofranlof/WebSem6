import { Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { CreateRecordDTO } from './dto/create-record.dto';
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { connect } from "rxjs";


@Injectable()
export class RecordService {
  constructor(private prisma: PrismaService) {}

  async getAllRecords(offset?: number, limit?: number) {
    return this.prisma.record.findMany({
      take: limit,
      skip: offset,
    });
  }

  async getRecordsByID(id: number) {
    return this.prisma.record.findUnique({ where: {id} });
  }

  async createRecord(id: number, createRecordDTO: CreateRecordDTO) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} does not exist.`);
    }
    const recordData: Prisma.RecordCreateInput = {
      title: createRecordDTO.title,
      author: {connect: {id: user.id}},
      stats: createRecordDTO.stats ? {
        create: {
          becnhPress: createRecordDTO.stats.benchPress,
          deadLift: createRecordDTO.stats.deadLift,
          squat: createRecordDTO.stats.squat,
        }
      } : undefined,
    }
    return this.prisma.record.create({ data: recordData });
  }

  async deleteRecord(id: number) {
    return this.prisma.record.delete({ where: {id} });
  }
}
