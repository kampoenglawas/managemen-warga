import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ResidenceDTO } from '../service/dto/residence.dto';
import { ResidenceMapper } from '../service/mapper/residence.mapper';
import { ResidenceRepository } from '../repository/residence.repository';

const relationshipNames = [];
relationshipNames.push('rT');

@Injectable()
export class ResidenceService {
  logger = new Logger('ResidenceService');

  constructor(@InjectRepository(ResidenceRepository) private residenceRepository: ResidenceRepository) {}

  async findById(id: string): Promise<ResidenceDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.residenceRepository.findOne(id, options);
    return ResidenceMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<ResidenceDTO>): Promise<ResidenceDTO | undefined> {
    const result = await this.residenceRepository.findOne(options);
    return ResidenceMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<ResidenceDTO>): Promise<[ResidenceDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.residenceRepository.findAndCount(options);
    const residenceDTO: ResidenceDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(residence => residenceDTO.push(ResidenceMapper.fromEntityToDTO(residence)));
      resultList[0] = residenceDTO;
    }
    return resultList;
  }

  async save(residenceDTO: ResidenceDTO): Promise<ResidenceDTO | undefined> {
    const entity = ResidenceMapper.fromDTOtoEntity(residenceDTO);
    const result = await this.residenceRepository.save(entity);
    return ResidenceMapper.fromEntityToDTO(result);
  }

  async update(residenceDTO: ResidenceDTO): Promise<ResidenceDTO | undefined> {
    const entity = ResidenceMapper.fromDTOtoEntity(residenceDTO);
    const result = await this.residenceRepository.save(entity);
    return ResidenceMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.residenceRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
