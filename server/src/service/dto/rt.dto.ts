/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { ResidenceDTO } from './residence.dto';

/**
 * A RT DTO object.
 */
export class RTDTO extends BaseDTO {
  @ApiModelProperty({ description: 'name field', required: false })
  name: string;

  @ApiModelProperty({ type: ResidenceDTO, isArray: true, description: 'residences relationship' })
  residences: ResidenceDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
