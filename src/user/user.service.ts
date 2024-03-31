import { Injectable, NotImplementedException } from '@nestjs/common';
import { UserDTO } from './dto/create-user.dto';
@Injectable()
export class UserService {
  getAllUsers() {
    throw new NotImplementedException();
  }

  getUserByID(id: number) {
    throw new NotImplementedException(id);
  }

  createUser(user: UserDTO) {
    throw new NotImplementedException(user);
  }

  deleteUser(id: number) {
    throw new NotImplementedException(id);
  }

  updateUser(user: UserDTO) {
    throw new NotImplementedException(user);
  }
}
