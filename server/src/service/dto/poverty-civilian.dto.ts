/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { CivilianDTO } from './civilian.dto';

/**
 * A PovertyCivilian DTO object.
 */
export class PovertyCivilianDTO extends BaseDTO {
  @ApiModelProperty({ description: 'reason field', required: false })
  reason: any;

  @ApiModelProperty({ type: CivilianDTO, description: 'civilian relationship' })
  civilian: CivilianDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}


export class PovertyRationDTO extends BaseDTO {
  size: number;
  total: number;
}
