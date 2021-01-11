import { EntityRepository, Repository } from 'typeorm';
import { RT } from '../domain/rt.entity';

@EntityRepository(RT)
export class RTRepository extends Repository<RT> {}
