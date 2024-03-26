import { Injectable, NotImplementedException } from '@nestjs/common';
import { UserDTO } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client'
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  getAllUsers() {
    return this.prisma.user.findMany();
  }

  getUserByID(id: number) {
    throw new NotImplementedException(id);
  }

  createUser(user: UserDTO) {
    return this.prisma.user.create({
      name: user.name,
      records: user.records,
      achievements: user.achievements,
      registerDate: user.registerDate,
    });
  }

  deleteUser(id: number) {
    throw new NotImplementedException(id);
  }
}
