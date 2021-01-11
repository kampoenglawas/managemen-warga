import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { RTDTO } from '../service/dto/rt.dto';
import { RTMapper } from '../service/mapper/rt.mapper';
import { RTRepository } from '../repository/rt.repository';

const relationshipNames = [];

@Injectable()
export class RTService {
  logger = new Logger('RTService');

  constructor(@InjectRepository(RTRepository) private rTRepository: RTRepository) {}

  async findById(id: string): Promise<RTDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.rTRepository.findOne(id, options);
    return RTMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<RTDTO>): Promise<RTDTO | undefined> {
    const result = await this.rTRepository.findOne(options);
    return RTMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<RTDTO>): Promise<[RTDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.rTRepository.findAndCount(options);
    const rTDTO: RTDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(rT => rTDTO.push(RTMapper.fromEntityToDTO(rT)));
      resultList[0] = rTDTO;
    }
    return resultList;
  }

  async save(rTDTO: RTDTO): Promise<RTDTO | undefined> {
    const entity = RTMapper.fromDTOtoEntity(rTDTO);
    const result = await this.rTRepository.save(entity);
    return RTMapper.fromEntityToDTO(result);
  }

  async update(rTDTO: RTDTO): Promise<RTDTO | undefined> {
    const entity = RTMapper.fromDTOtoEntity(rTDTO);
    const result = await this.rTRepository.save(entity);
    return RTMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.rTRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
