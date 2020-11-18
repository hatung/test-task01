import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { Body, INestApplication, ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); //
    await app.init();
  });

  it('/ (POST): No star_time Should return 400 status', () => {
    const createEvent = {
      name: 'My Event Exam',
    };

    return request(app.getHttpServer())
      .post('/events')
      .set('Accept', 'application/json')
      .send(createEvent)
      .expect(400);
  });
  it('/ (POST): There is no end_time Should return 400 status', () => {
    const createEvent = {
      name: 'My Event Exam',
      start_date: '2020-11-01T08:00:00Z',
    };

    return request(app.getHttpServer())
      .post('/events')
      .set('Accept', 'application/json')
      .send(createEvent)
      .expect(400);
  });
  it('/ (POST): end_time before start_time Should return 400 status', () => {
    const createEvent = {
      name: 'My Event Exam',
      start_date: '2020-11-01T08:00:00Z',
      end_date: '2017-09-01T08:00:00Z',
    };

    return request(app.getHttpServer())
      .post('/events')
      .set('Accept', 'application/json')
      .send(createEvent)
      .expect(400);
  });
  it('/ (POST): Valid params Should return 200 status', () => {
    const createEvent = {
      name: 'My Event Exam',
      start_date: '2020-09-01T08:00:00Z',
      end_date: '2020-11-01T08:00:00Z',
    };

    return request(app.getHttpServer())
      .post('/events')
      .set('Accept', 'application/json')
      .send(createEvent)
      .expect(201);
  });

  it('/ (GET):1 event in  January', () => {
    return request(app.getHttpServer())
      .get('/events?start_date="2020-01-01"&end_date="2020-01-31"')
      .set('Accept', 'application/json')
      .expect(200);
  });
});
