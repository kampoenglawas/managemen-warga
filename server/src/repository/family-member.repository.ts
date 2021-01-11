import { EntityRepository, Repository } from 'typeorm';
import FamilyMember from '../domain/family-member.entity';

@EntityRepository(FamilyMember)
export class FamilyMemberRepository extends Repository<FamilyMember> {}
