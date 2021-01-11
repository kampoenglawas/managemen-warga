import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Family from '../domain/family.entity';
import { FamilyRepository } from '../repository/family.repository';

const relationshipNames = [];

@Injectable()
export class FamilyService {
  logger = new Logger('FamilyService');

  constructor(@InjectRepository(FamilyRepository) private familyRepository: FamilyRepository) {}

  async findById(id: string): Promise<Family | undefined> {
    const options = { relations: relationshipNames };
    return await this.familyRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Family>): Promise<Family | undefined> {
    return await this.familyRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Family>): Promise<[Family[], number]> {
    options.relations = relationshipNames;
    return await this.familyRepository.findAndCount(options);
  }

  async save(family: Family): Promise<Family | undefined> {
    return await this.familyRepository.save(family);
  }

  async update(family: Family): Promise<Family | undefined> {
    return await this.save(family);
  }

  async delete(family: Family): Promise<Family | undefined> {
    return await this.familyRepository.remove(family);
  }
}
