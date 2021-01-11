import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { FamilyDTO } from '../service/dto/family.dto';
import { FamilyMapper } from '../service/mapper/family.mapper';
import { FamilyRepository } from '../repository/family.repository';

const relationshipNames = [];

@Injectable()
export class FamilyService {
  logger = new Logger('FamilyService');

  constructor(@InjectRepository(FamilyRepository) private familyRepository: FamilyRepository) {}

  async findById(id: string): Promise<FamilyDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.familyRepository.findOne(id, options);
    return FamilyMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<FamilyDTO>): Promise<FamilyDTO | undefined> {
    const result = await this.familyRepository.findOne(options);
    return FamilyMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<FamilyDTO>): Promise<[FamilyDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.familyRepository.findAndCount(options);
    const familyDTO: FamilyDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(family => familyDTO.push(FamilyMapper.fromEntityToDTO(family)));
      resultList[0] = familyDTO;
    }
    return resultList;
  }

  async save(familyDTO: FamilyDTO): Promise<FamilyDTO | undefined> {
    const entity = FamilyMapper.fromDTOtoEntity(familyDTO);
    const result = await this.familyRepository.save(entity);
    return FamilyMapper.fromEntityToDTO(result);
  }

  async update(familyDTO: FamilyDTO): Promise<FamilyDTO | undefined> {
    const entity = FamilyMapper.fromDTOtoEntity(familyDTO);
    const result = await this.familyRepository.save(entity);
    return FamilyMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.familyRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
