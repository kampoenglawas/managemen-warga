/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { BenefitDTO } from './benefit.dto';
import { FamilyMemberDTO } from './family-member.dto';
import { PovertyCivilianDTO } from './poverty-civilian.dto';
import { ResidenceDTO } from './residence.dto';
import { Gender } from '../../domain/enumeration/gender';
import { MemberStatus } from '../../domain/enumeration/member-status';

/**
 * A Civilian DTO object.
 */
export class CivilianDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ description: 'name field' })
  name: string;

  @Length(16, 16)
  @ApiModelProperty({ description: 'identityNo field', required: false })
  identityNo: string;

  @ApiModelProperty({ description: 'identityCardImage field', required: false })
  identityCardImage: any;

  identityCardImageContentType: string;
  @IsNotEmpty()
  @ApiModelProperty({ description: 'dateOfBirth field' })
  dateOfBirth: any;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'placeOfBirth field' })
  placeOfBirth: string;

  @IsNotEmpty()
  @ApiModelProperty({ enum: Gender, description: 'gender enum field' })
  gender: Gender;

  @ApiModelProperty({ description: 'additionalInfo field', required: false })
  additionalInfo: string;

  @ApiModelProperty({ description: 'yearlyIncome field', required: false })
  yearlyIncome: number;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'contact field' })
  contact: string;

  @IsNotEmpty()
  @ApiModelProperty({ enum: MemberStatus, description: 'status enum field' })
  status: MemberStatus;

  @ApiModelProperty({ type: BenefitDTO, isArray: true, description: 'benefits relationship' })
  benefits: BenefitDTO[];

  @ApiModelProperty({ type: FamilyMemberDTO, description: 'familyMember relationship' })
  familyMember: FamilyMemberDTO;

  @ApiModelProperty({ type: PovertyCivilianDTO, description: 'povertyCivilian relationship' })
  povertyCivilian: PovertyCivilianDTO;

  @ApiModelProperty({ type: ResidenceDTO, description: 'residence relationship' })
  residence: ResidenceDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
