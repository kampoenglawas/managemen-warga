import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { BenefitDTO } from '../service/dto/benefit.dto';
import { BenefitMapper } from '../service/mapper/benefit.mapper';
import { BenefitRepository } from '../repository/benefit.repository';

const relationshipNames = [];

@Injectable()
export class BenefitService {
  logger = new Logger('BenefitService');

  constructor(@InjectRepository(BenefitRepository) private benefitRepository: BenefitRepository) {}

  async findById(id: string): Promise<BenefitDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.benefitRepository.findOne(id, options);
    return BenefitMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<BenefitDTO>): Promise<BenefitDTO | undefined> {
    const result = await this.benefitRepository.findOne(options);
    return BenefitMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<BenefitDTO>): Promise<[BenefitDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.benefitRepository.findAndCount(options);
    const benefitDTO: BenefitDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(benefit => benefitDTO.push(BenefitMapper.fromEntityToDTO(benefit)));
      resultList[0] = benefitDTO;
    }
    return resultList;
  }

  async save(benefitDTO: BenefitDTO): Promise<BenefitDTO | undefined> {
    const entity = BenefitMapper.fromDTOtoEntity(benefitDTO);
    const result = await this.benefitRepository.save(entity);
    return BenefitMapper.fromEntityToDTO(result);
  }

  async update(benefitDTO: BenefitDTO): Promise<BenefitDTO | undefined> {
    const entity = BenefitMapper.fromDTOtoEntity(benefitDTO);
    const result = await this.benefitRepository.save(entity);
    return BenefitMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.benefitRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
