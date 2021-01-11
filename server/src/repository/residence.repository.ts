import { EntityRepository, Repository } from 'typeorm';
import Residence from '../domain/residence.entity';

@EntityRepository(Residence)
export class ResidenceRepository extends Repository<Residence> {}
