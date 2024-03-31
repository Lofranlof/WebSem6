import { Injectable, NotImplementedException } from '@nestjs/common';
import { TypeDTO } from './dto/create-type.dto';

@Injectable()
export class TypeService {
  getAllTypes() {
    throw new NotImplementedException();
  }

  getTypeByName(name: string) {
    throw new NotImplementedException(name);
  }

  createType(type: TypeDTO) {
    throw new NotImplementedException(type);
  }

  deleteType(name: string) {
    throw new NotImplementedException(name);
  }

  updateType(type: TypeDTO) {
    throw new NotImplementedException((type))
  }
}
