import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import RT from '../domain/rt.entity';
import { RTRepository } from '../repository/rt.repository';

const relationshipNames = [];

@Injectable()
export class RTService {
  logger = new Logger('RTService');

  constructor(@InjectRepository(RTRepository) private rTRepository: RTRepository) {}

  async findById(id: string): Promise<RT | undefined> {
    const options = { relations: relationshipNames };
    return await this.rTRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<RT>): Promise<RT | undefined> {
    return await this.rTRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<RT>): Promise<[RT[], number]> {
    options.relations = relationshipNames;
    return await this.rTRepository.findAndCount(options);
  }

  async save(rT: RT): Promise<RT | undefined> {
    return await this.rTRepository.save(rT);
  }

  async update(rT: RT): Promise<RT | undefined> {
    return await this.save(rT);
  }

  async delete(rT: RT): Promise<RT | undefined> {
    return await this.rTRepository.remove(rT);
  }
}
