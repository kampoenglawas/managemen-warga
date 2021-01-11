import { EntityRepository, Repository } from 'typeorm';
import { Benefit } from '../domain/benefit.entity';

@EntityRepository(Benefit)
export class BenefitRepository extends Repository<Benefit> {}
