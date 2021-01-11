import { EntityRepository, Repository } from 'typeorm';
import { Family } from '../domain/family.entity';

@EntityRepository(Family)
export class FamilyRepository extends Repository<Family> {}
