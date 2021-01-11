import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PovertyCivilian from '../domain/poverty-civilian.entity';
import { PovertyCivilianRepository } from '../repository/poverty-civilian.repository';

const relationshipNames = [];

@Injectable()
export class PovertyCivilianService {
  logger = new Logger('PovertyCivilianService');

  constructor(@InjectRepository(PovertyCivilianRepository) private povertyCivilianRepository: PovertyCivilianRepository) {}

  async findById(id: string): Promise<PovertyCivilian | undefined> {
    const options = { relations: relationshipNames };
    return await this.povertyCivilianRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PovertyCivilian>): Promise<PovertyCivilian | undefined> {
    return await this.povertyCivilianRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<PovertyCivilian>): Promise<[PovertyCivilian[], number]> {
    options.relations = relationshipNames;
    return await this.povertyCivilianRepository.findAndCount(options);
  }

  async save(povertyCivilian: PovertyCivilian): Promise<PovertyCivilian | undefined> {
    return await this.povertyCivilianRepository.save(povertyCivilian);
  }

  async update(povertyCivilian: PovertyCivilian): Promise<PovertyCivilian | undefined> {
    return await this.save(povertyCivilian);
  }

  async delete(povertyCivilian: PovertyCivilian): Promise<PovertyCivilian | undefined> {
    return await this.povertyCivilianRepository.remove(povertyCivilian);
  }
}
