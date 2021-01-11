import { EntityRepository, Repository } from 'typeorm';
import PovertyCivilian from '../domain/poverty-civilian.entity';

@EntityRepository(PovertyCivilian)
export class PovertyCivilianRepository extends Repository<PovertyCivilian> {}
