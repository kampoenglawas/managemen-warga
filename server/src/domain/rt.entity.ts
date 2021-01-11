/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Residence } from './residence.entity';

/**
 * A RT.
 */
@Entity('rt')
export class RT extends BaseEntity {
  @Column({ name: 'name', nullable: true })
  name: string;

  @OneToMany(
    type => Residence,
    other => other.rT
  )
  residences: Residence[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
