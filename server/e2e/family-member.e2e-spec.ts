import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { FamilyMemberDTO } from '../src/service/dto/family-member.dto';
import { FamilyMemberService } from '../src/service/family-member.service';

describe('FamilyMember Controller', () => {
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
    deleteById: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(FamilyMemberService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all family-members ', async () => {
    const getEntities: FamilyMemberDTO[] = (
      await request(app.getHttpServer())
        .get('/api/family-members')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET family-members by id', async () => {
    const getEntity: FamilyMemberDTO = (
      await request(app.getHttpServer())
        .get('/api/family-members/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create family-members', async () => {
    const createdEntity: FamilyMemberDTO = (
      await request(app.getHttpServer())
        .post('/api/family-members')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update family-members', async () => {
    const updatedEntity: FamilyMemberDTO = (
      await request(app.getHttpServer())
        .put('/api/family-members')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE family-members', async () => {
    const deletedEntity: FamilyMemberDTO = (
      await request(app.getHttpServer())
        .delete('/api/family-members/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
