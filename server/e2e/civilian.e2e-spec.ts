import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import Civilian from '../src/domain/civilian.entity';
import { CivilianService } from '../src/service/civilian.service';

describe('Civilian Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId',
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    delete: (): any => entityMock,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(CivilianService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all civilians ', async () => {
    const getEntities: Civilian[] = (await request(app.getHttpServer()).get('/api/civilians').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET civilians by id', async () => {
    const getEntity: Civilian = (
      await request(app.getHttpServer())
        .get('/api/civilians/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create civilians', async () => {
    const createdEntity: Civilian = (await request(app.getHttpServer()).post('/api/civilians').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update civilians', async () => {
    const updatedEntity: Civilian = (await request(app.getHttpServer()).put('/api/civilians').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE civilians', async () => {
    const deletedEntity: Civilian = (
      await request(app.getHttpServer())
        .delete('/api/civilians/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
