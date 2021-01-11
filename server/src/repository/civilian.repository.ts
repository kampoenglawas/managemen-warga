import { EntityRepository, Repository } from 'typeorm';
import { Civilian } from '../domain/civilian.entity';

@EntityRepository(Civilian)
export class CivilianRepository extends Repository<Civilian> {}
