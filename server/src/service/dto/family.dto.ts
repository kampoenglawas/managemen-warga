/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { FamilyMemberDTO } from './family-member.dto';

/**
 * A Family DTO object.
 */
export class FamilyDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ description: 'familyCardNo field' })
  familyCardNo: string;

  @ApiModelProperty({ description: 'familyCardImage field', required: false })
  familyCardImage: any;

  familyCardImageContentType: string;

  @ApiModelProperty({ type: FamilyMemberDTO, isArray: true, description: 'members relationship' })
  members: FamilyMemberDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
