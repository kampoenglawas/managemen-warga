/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Civilian } from './civilian.entity';

/**
 * A PovertyCivilian.
 */
@Entity('poverty_civilian')
export class PovertyCivilian extends BaseEntity {
  @Column({ type: 'blob', name: 'reason', nullable: true })
  reason: any;

  @OneToOne(type => Civilian)
  @JoinColumn()
  civilian: Civilian;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
