import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PovertyCivilian from '../src/domain/poverty-civilian.entity';
import { PovertyCivilianService } from '../src/service/poverty-civilian.service';

describe('PovertyCivilian Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    delete: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(PovertyCivilianService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all poverty-civilians ', async () => {
    const getEntities: PovertyCivilian[] = (
      await request(app.getHttpServer())
        .get('/api/poverty-civilians')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET poverty-civilians by id', async () => {
    const getEntity: PovertyCivilian = (
      await request(app.getHttpServer())
        .get('/api/poverty-civilians/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create poverty-civilians', async () => {
    const createdEntity: PovertyCivilian = (
      await request(app.getHttpServer())
        .post('/api/poverty-civilians')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update poverty-civilians', async () => {
    const updatedEntity: PovertyCivilian = (
      await request(app.getHttpServer())
        .put('/api/poverty-civilians')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE poverty-civilians', async () => {
    const deletedEntity: PovertyCivilian = (
      await request(app.getHttpServer())
        .delete('/api/poverty-civilians/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
