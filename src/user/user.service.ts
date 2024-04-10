import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

import { User, Prisma } from '@prisma/client'
import { PrismaService } from "../prisma/prisma.service";
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers(offset?: number, limit?: number) {
    return this.prisma.user.findMany({
      take: limit,
      skip: offset,
    });
  }

  async getUserByID(id: number) {
    return this.prisma.user.findUnique({ where: {id} });
  }

  async createUser(createUserDTO: CreateUserDTO){
    const userData: Prisma.UserCreateInput = {
      name: createUserDTO.name,
      email: createUserDTO.email,
      password: createUserDTO.password,
      records: createUserDTO.records ? {
        create: createUserDTO.records.map(record => ({
          title: record.title,
          author: record.author
        }))
      } : undefined,
      achievements: createUserDTO.achievements ? {
        create: createUserDTO.achievements.map(achievement => ({
          author: achievement.author,
          type: {
            create: achievement.type
          }
        }))
      } : undefined,
    };
    return this.prisma.user.create({ data: userData });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: {id} });
  }

  async updateUser(id: number, updateUserDTO: UpdateUserDTO) {
    const userData: Prisma.UserCreateInput = {
      name: updateUserDTO.name,
      email: updateUserDTO.email,
      password: updateUserDTO.password,
      records: updateUserDTO.records ? {
        create: updateUserDTO.records.map(record => ({
          title: record.title,
          author: record.author
        }))
      } : undefined,
      achievements: updateUserDTO.achievements ? {
        create: updateUserDTO.achievements.map(achievement => ({
          author: achievement.author,
          type: {
            create: achievement.type
          }
        }))
      } : undefined,
    };

    return this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }
}
