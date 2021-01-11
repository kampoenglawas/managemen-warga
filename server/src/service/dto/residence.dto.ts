/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { CivilianDTO } from './civilian.dto';
import { RTDTO } from './rt.dto';

/**
 * A Residence DTO object.
 */
export class ResidenceDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ description: 'no field' })
  no: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'bloc field' })
  bloc: string;

  @ApiModelProperty({ description: 'description field', required: false })
  description: string;

  @ApiModelProperty({ type: CivilianDTO, isArray: true, description: 'members relationship' })
  members: CivilianDTO[];

  @ApiModelProperty({ type: RTDTO, description: 'rT relationship' })
  rT: RTDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
