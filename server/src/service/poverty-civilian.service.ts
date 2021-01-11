import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { PovertyCivilianDTO } from '../service/dto/poverty-civilian.dto';
import { PovertyCivilianMapper } from '../service/mapper/poverty-civilian.mapper';
import { PovertyCivilianRepository } from '../repository/poverty-civilian.repository';

const relationshipNames = [];

@Injectable()
export class PovertyCivilianService {
  logger = new Logger('PovertyCivilianService');

  constructor(@InjectRepository(PovertyCivilianRepository) private povertyCivilianRepository: PovertyCivilianRepository) {}

  async findById(id: string): Promise<PovertyCivilianDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.povertyCivilianRepository.findOne(id, options);
    return PovertyCivilianMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<PovertyCivilianDTO>): Promise<PovertyCivilianDTO | undefined> {
    const result = await this.povertyCivilianRepository.findOne(options);
    return PovertyCivilianMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<PovertyCivilianDTO>): Promise<[PovertyCivilianDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.povertyCivilianRepository.findAndCount(options);
    const povertyCivilianDTO: PovertyCivilianDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(povertyCivilian => povertyCivilianDTO.push(PovertyCivilianMapper.fromEntityToDTO(povertyCivilian)));
      resultList[0] = povertyCivilianDTO;
    }
    return resultList;
  }

  async save(povertyCivilianDTO: PovertyCivilianDTO): Promise<PovertyCivilianDTO | undefined> {
    const entity = PovertyCivilianMapper.fromDTOtoEntity(povertyCivilianDTO);
    const result = await this.povertyCivilianRepository.save(entity);
    return PovertyCivilianMapper.fromEntityToDTO(result);
  }

  async update(povertyCivilianDTO: PovertyCivilianDTO): Promise<PovertyCivilianDTO | undefined> {
    const entity = PovertyCivilianMapper.fromDTOtoEntity(povertyCivilianDTO);
    const result = await this.povertyCivilianRepository.save(entity);
    return PovertyCivilianMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.povertyCivilianRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
