import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should start simulation, generate matches and stop simulation', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation startSimulation {
          startSimulation(input: {name: "Katar 2023"})
        }`
      })
      .expect(200);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query matches {
          matches {
            homeTeam
            homeScore
            awayTeam
            awayScore
          }
        }`
      })
      .expect(200);

    expect(res.body.data.matches.length).toBeGreaterThan(0);
    const matches = res.body.data.matches;
    const hasGoals = matches.some(match => match.homeScore > 0 || match.awayScore > 0);
    expect(hasGoals).toBe(true);

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation stopSimulation {
          stopSimulation
        }`
      })
      .expect(200)
      .expect(res => {
        expect(res.body.data.stopSimulation).toBe('Simulation stopped.');
      });
  });

  it('should fail to stop simulation when not running', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation stopSimulation {
          stopSimulation
        }`
      })
      .expect(200)
      .expect(res => {
        expect(res.body.data.stopSimulation).toBe('Simulation is not running.');
      });
  });

  it('should restart simulation and check matches list is empty', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation restartSimulation {
          restartSimulation
        }`
      })
      .expect(200)
      .expect(res => {
        expect(res.body.data.restartSimulation).toBe('Simulation has been restarted.');
      });

      const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query matches {
          matches {
            homeTeam
            homeScore
            awayTeam
            awayScore
          }
        }`
      })
      .expect(200);

    expect(res.body.data.matches.length).toBe(0);
  });

  it('should start and stop simulation successfully', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation startSimulation {
          startSimulation(input: {name: "Katar 2023"})
        }`
      })
      .expect(200);

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation stopSimulation {
          stopSimulation
        }`
      })
      .expect(200)
      .expect(res => {
        expect(res.body.data.stopSimulation).toBe('Simulation stopped.');
      });
  });

});
