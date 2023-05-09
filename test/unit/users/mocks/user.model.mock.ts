import { usersFaker } from '../../../faker/users.faker';

export class UserModelMock {
  findOne(query, ...data): any {
    if (query.emailId === usersFaker.emailId) return this;
  }

  async create(query): Promise<object> {
    return usersFaker;
  }

  findById(id): any {
    if (usersFaker._id === id) return this;
  }
  async lean(): Promise<any> {
    return usersFaker;
  }
}
