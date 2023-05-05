import { usersStub } from '../stubs/users.stub';

export class UserModelMock {
  findOne(query, ...data): any {
    if (query.emailId === usersStub.emailId) return this;
  }

  async create(query): Promise<object> {
    return usersStub;
  }

  findById(id): any {
    if (usersStub._id === id) return this;
  }
  async lean(): Promise<any> {
    return usersStub;
  }
}
