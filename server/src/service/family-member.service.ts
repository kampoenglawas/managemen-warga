import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import FamilyMember from '../domain/family-member.entity';
import { FamilyMemberRepository } from '../repository/family-member.repository';

const relationshipNames = [];
relationshipNames.push('family');

@Injectable()
export class FamilyMemberService {
  logger = new Logger('FamilyMemberService');

  constructor(@InjectRepository(FamilyMemberRepository) private familyMemberRepository: FamilyMemberRepository) {}

  async findById(id: string): Promise<FamilyMember | undefined> {
    const options = { relations: relationshipNames };
    return await this.familyMemberRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<FamilyMember>): Promise<FamilyMember | undefined> {
    return await this.familyMemberRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<FamilyMember>): Promise<[FamilyMember[], number]> {
    options.relations = relationshipNames;
    return await this.familyMemberRepository.findAndCount(options);
  }

  async save(familyMember: FamilyMember): Promise<FamilyMember | undefined> {
    return await this.familyMemberRepository.save(familyMember);
  }

  async update(familyMember: FamilyMember): Promise<FamilyMember | undefined> {
    return await this.save(familyMember);
  }

  async delete(familyMember: FamilyMember): Promise<FamilyMember | undefined> {
    return await this.familyMemberRepository.remove(familyMember);
  }
}
