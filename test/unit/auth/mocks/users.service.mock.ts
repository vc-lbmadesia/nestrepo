import { commonUserFaker, usersFaker } from '../../../faker/users.faker';
import * as bcrypt from 'bcrypt';

export class UsersServiceMock {
  async findOne(query: object): Promise<any> {
    const userData = { ...usersFaker };
    userData.password = await bcrypt.hash(userData.password, 10);

    return userData;
  }
}
