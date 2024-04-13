import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateTypeDTO } from "./dto/create-type.dto";
import { UpdateTypeDTO } from "./dto/update-type.dto"
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";


@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}

  async getAllTypes(offset: number, limit: number) {
    return this.prisma.type.findMany({
      take: limit,
      skip: offset,
    });
  }

  async getTypeById(id: number) {
    return this.prisma.type.findUnique({ where: {id} });
  }

  async createType(createTypeDTO: CreateTypeDTO) {
    const typeData: Prisma.TypeCreateInput = {
      title: createTypeDTO.title,
      achievement: createTypeDTO.achievement ? {
      } : undefined,
    }

    return this.prisma.type.create({ data: typeData });
  }

  async deleteType(id: number) {
    return this.prisma.type.delete({ where: {id} });
  }

  async updateType(id: number, updateTypeDTO: UpdateTypeDTO) {
    const typeData: Prisma.TypeCreateInput = {
      title: updateTypeDTO.title,
      achievement: updateTypeDTO.achievement ? {
      } : undefined,
    }

    return this.prisma.type.update({
      where: { id },
      data: typeData,
    });
  }
}
