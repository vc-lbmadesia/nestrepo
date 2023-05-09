import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BadRequestException, HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { usersFaker } from '../faker/users.faker';

describe('Users', () => {
  let app: INestApplication;

  let connection: Connection;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api/v1');
    connection = app.get(getConnectionToken());
    await app.init();
  });

  describe(`/POST users`, () => {
    const userData = {
      firstName: usersFaker.firstName,
      lastName: usersFaker.lastName,
      emailId: usersFaker.emailId,
      password: usersFaker.password,
    };

    it(`should be create new users`, async () => {
      const response = await request(app.getHttpServer()).post('/api/v1/users').send(userData);
      expect(response.status).toEqual(HttpStatus.CREATED);
      const responseData = JSON.parse(response.text);
      expect(responseData).toHaveProperty('data');
    });

    it(`should be throw bad reqest if email-id is exist`, async () => {
      const responseData = await request(app.getHttpServer()).post('/api/v1/users').send(userData);
      expect(responseData.status).toEqual(HttpStatus.BAD_REQUEST);
    });
  });

  afterAll(async () => {
    await connection.dropCollection('users');
    await connection.close();
    await app.close();
  });
});
