/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Civilian } from './civilian.entity';
import { RT } from './rt.entity';

/**
 * A Residence.
 */
@Entity('residence')
export class Residence extends BaseEntity {
  @Column({ name: 'no' })
  no: string;

  @Column({ name: 'bloc' })
  bloc: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @OneToMany(
    type => Civilian,
    other => other.residence
  )
  members: Civilian[];

  @ManyToOne(type => RT)
  rT: RT;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
