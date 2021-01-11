import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CivilianDTO } from '../service/dto/civilian.dto';
import { CivilianMapper } from '../service/mapper/civilian.mapper';
import { CivilianRepository } from '../repository/civilian.repository';

const relationshipNames = [];
relationshipNames.push('benefits');
relationshipNames.push('residence');

@Injectable()
export class CivilianService {
  logger = new Logger('CivilianService');

  constructor(@InjectRepository(CivilianRepository) private civilianRepository: CivilianRepository) {}

  async findById(id: string): Promise<CivilianDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.civilianRepository.findOne(id, options);
    return CivilianMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<CivilianDTO>): Promise<CivilianDTO | undefined> {
    const result = await this.civilianRepository.findOne(options);
    return CivilianMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<CivilianDTO>): Promise<[CivilianDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.civilianRepository.findAndCount(options);
    const civilianDTO: CivilianDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(civilian => civilianDTO.push(CivilianMapper.fromEntityToDTO(civilian)));
      resultList[0] = civilianDTO;
    }
    return resultList;
  }

  async save(civilianDTO: CivilianDTO): Promise<CivilianDTO | undefined> {
    const entity = CivilianMapper.fromDTOtoEntity(civilianDTO);
    const result = await this.civilianRepository.save(entity);
    return CivilianMapper.fromEntityToDTO(result);
  }

  async update(civilianDTO: CivilianDTO): Promise<CivilianDTO | undefined> {
    const entity = CivilianMapper.fromDTOtoEntity(civilianDTO);
    const result = await this.civilianRepository.save(entity);
    return CivilianMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.civilianRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
