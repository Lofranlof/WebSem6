import { Injectable, NotImplementedException } from '@nestjs/common';
import { RecordDTO } from './dto/create-record.dto';

@Injectable()
export class RecordService {
  getRecordsByID(id: number) {
    throw new NotImplementedException(id);
  }

  createRecord(record: RecordDTO) {
    throw new NotImplementedException(record);
  }

  deleteRecord(id: number) {
    throw new NotImplementedException(id);
  }
}
