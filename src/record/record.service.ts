import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateRecordDTO } from './dto/create-record.dto';
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";


@Injectable()
export class RecordService {
  constructor(private prisma: PrismaService) {}

  getRecordsByID(id: number) {
    return this.prisma.record.findUnique({ where: {id} });
  }

  createRecord(createRecordDTO: CreateRecordDTO) {
    const recordData: Prisma.RecordCreateInput = {
      title: createRecordDTO.title,
      author: createRecordDTO.author ? {} : undefined,
      stats: createRecordDTO.stats ? {} : undefined,
    }
    return this.prisma.record.create({ data: recordData });
  }

  deleteRecord(id: number) {
    return this.prisma.record.delete({ where: {id} });
  }
}
