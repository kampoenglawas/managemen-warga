import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Benefit from '../domain/benefit.entity';
import { BenefitRepository } from '../repository/benefit.repository';

const relationshipNames = [];

@Injectable()
export class BenefitService {
  logger = new Logger('BenefitService');

  constructor(@InjectRepository(BenefitRepository) private benefitRepository: BenefitRepository) {}

  async findById(id: string): Promise<Benefit | undefined> {
    const options = { relations: relationshipNames };
    return await this.benefitRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Benefit>): Promise<Benefit | undefined> {
    return await this.benefitRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Benefit>): Promise<[Benefit[], number]> {
    options.relations = relationshipNames;
    return await this.benefitRepository.findAndCount(options);
  }

  async save(benefit: Benefit): Promise<Benefit | undefined> {
    return await this.benefitRepository.save(benefit);
  }

  async update(benefit: Benefit): Promise<Benefit | undefined> {
    return await this.save(benefit);
  }

  async delete(benefit: Benefit): Promise<Benefit | undefined> {
    return await this.benefitRepository.remove(benefit);
  }
}
