import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { FamilyMemberDTO } from '../service/dto/family-member.dto';
import { FamilyMemberMapper } from '../service/mapper/family-member.mapper';
import { FamilyMemberRepository } from '../repository/family-member.repository';

const relationshipNames = [];
relationshipNames.push('family');

@Injectable()
export class FamilyMemberService {
  logger = new Logger('FamilyMemberService');

  constructor(@InjectRepository(FamilyMemberRepository) private familyMemberRepository: FamilyMemberRepository) {}

  async findById(id: string): Promise<FamilyMemberDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.familyMemberRepository.findOne(id, options);
    return FamilyMemberMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<FamilyMemberDTO>): Promise<FamilyMemberDTO | undefined> {
    const result = await this.familyMemberRepository.findOne(options);
    return FamilyMemberMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<FamilyMemberDTO>): Promise<[FamilyMemberDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.familyMemberRepository.findAndCount(options);
    const familyMemberDTO: FamilyMemberDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(familyMember => familyMemberDTO.push(FamilyMemberMapper.fromEntityToDTO(familyMember)));
      resultList[0] = familyMemberDTO;
    }
    return resultList;
  }

  async save(familyMemberDTO: FamilyMemberDTO): Promise<FamilyMemberDTO | undefined> {
    const entity = FamilyMemberMapper.fromDTOtoEntity(familyMemberDTO);
    const result = await this.familyMemberRepository.save(entity);
    return FamilyMemberMapper.fromEntityToDTO(result);
  }

  async update(familyMemberDTO: FamilyMemberDTO): Promise<FamilyMemberDTO | undefined> {
    const entity = FamilyMemberMapper.fromDTOtoEntity(familyMemberDTO);
    const result = await this.familyMemberRepository.save(entity);
    return FamilyMemberMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.familyMemberRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
