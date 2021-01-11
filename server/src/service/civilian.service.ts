import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Civilian from '../domain/civilian.entity';
import { CivilianRepository } from '../repository/civilian.repository';

const relationshipNames = [];
relationshipNames.push('benefits');
relationshipNames.push('residence');

@Injectable()
export class CivilianService {
  logger = new Logger('CivilianService');

  constructor(@InjectRepository(CivilianRepository) private civilianRepository: CivilianRepository) {}

  async findById(id: string): Promise<Civilian | undefined> {
    const options = { relations: relationshipNames };
    return await this.civilianRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Civilian>): Promise<Civilian | undefined> {
    return await this.civilianRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Civilian>): Promise<[Civilian[], number]> {
    options.relations = relationshipNames;
    return await this.civilianRepository.findAndCount(options);
  }

  async save(civilian: Civilian): Promise<Civilian | undefined> {
    return await this.civilianRepository.save(civilian);
  }

  async update(civilian: Civilian): Promise<Civilian | undefined> {
    return await this.save(civilian);
  }

  async delete(civilian: Civilian): Promise<Civilian | undefined> {
    return await this.civilianRepository.remove(civilian);
  }
}
