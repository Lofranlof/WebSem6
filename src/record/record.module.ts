import { Module } from '@nestjs/common';
import RecordController from './record.controller';
import { RecordService } from './record.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [RecordController],
  providers: [RecordService],
  imports: [PrismaModule]
})
export class RecordModule {}
