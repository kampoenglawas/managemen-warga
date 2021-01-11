/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { CivilianDTO } from './civilian.dto';
import { FamilyDTO } from './family.dto';
import { FamilyRole } from '../../domain/enumeration/family-role';

/**
 * A FamilyMember DTO object.
 */
export class FamilyMemberDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ enum: FamilyRole, description: 'role enum field' })
  role: FamilyRole;

  @ApiModelProperty({ type: CivilianDTO, description: 'civilian relationship' })
  civilian: CivilianDTO;

  @ApiModelProperty({ type: FamilyDTO, description: 'family relationship' })
  family: FamilyDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
