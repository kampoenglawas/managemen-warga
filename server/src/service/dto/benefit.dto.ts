/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { CivilianDTO } from './civilian.dto';
import { BenefitType } from '../../domain/enumeration/benefit-type';
import { RepetitionType } from '../../domain/enumeration/repetition-type';

/**
 * A Benefit DTO object.
 */
export class BenefitDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ description: 'description field' })
  description: string;

  @IsNotEmpty()
  @ApiModelProperty({ enum: BenefitType, description: 'type enum field' })
  type: BenefitType;

  @ApiModelProperty({ description: 'value field', required: false })
  value: number;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'frequency field' })
  frequency: number;

  @IsNotEmpty()
  @ApiModelProperty({ enum: RepetitionType, description: 'repetition enum field' })
  repetition: RepetitionType;

  @ApiModelProperty({ type: CivilianDTO, isArray: true, description: 'civilians relationship' })
  civilians: CivilianDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
