import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import Benefit from '../src/domain/benefit.entity';
import { BenefitService } from '../src/service/benefit.service';

describe('Benefit Controller', () => {
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
      .overrideProvider(BenefitService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all benefits ', async () => {
    const getEntities: Benefit[] = (await request(app.getHttpServer()).get('/api/benefits').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET benefits by id', async () => {
    const getEntity: Benefit = (
      await request(app.getHttpServer())
        .get('/api/benefits/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create benefits', async () => {
    const createdEntity: Benefit = (await request(app.getHttpServer()).post('/api/benefits').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update benefits', async () => {
    const updatedEntity: Benefit = (await request(app.getHttpServer()).put('/api/benefits').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE benefits', async () => {
    const deletedEntity: Benefit = (
      await request(app.getHttpServer())
        .delete('/api/benefits/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
