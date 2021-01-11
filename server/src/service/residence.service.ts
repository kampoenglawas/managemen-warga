import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Residence from '../domain/residence.entity';
import { ResidenceRepository } from '../repository/residence.repository';

const relationshipNames = [];
relationshipNames.push('rT');

@Injectable()
export class ResidenceService {
  logger = new Logger('ResidenceService');

  constructor(@InjectRepository(ResidenceRepository) private residenceRepository: ResidenceRepository) {}

  async findById(id: string): Promise<Residence | undefined> {
    const options = { relations: relationshipNames };
    return await this.residenceRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Residence>): Promise<Residence | undefined> {
    return await this.residenceRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Residence>): Promise<[Residence[], number]> {
    options.relations = relationshipNames;
    return await this.residenceRepository.findAndCount(options);
  }

  async save(residence: Residence): Promise<Residence | undefined> {
    return await this.residenceRepository.save(residence);
  }

  async update(residence: Residence): Promise<Residence | undefined> {
    return await this.save(residence);
  }

  async delete(residence: Residence): Promise<Residence | undefined> {
    return await this.residenceRepository.remove(residence);
  }
}
