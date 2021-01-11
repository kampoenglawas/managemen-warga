/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Civilian from './civilian.entity';
import { BenefitType } from './enumeration/benefit-type';
import { RepetitionType } from './enumeration/repetition-type';

/**
 * A Benefit.
 */
@Entity('benefit')
export default class Benefit extends BaseEntity {
  @Column({ name: 'description' })
  description: string;

  @Column({ type: 'simple-enum', name: 'type', enum: BenefitType })
  type: BenefitType;

  @Column({ type: 'integer', name: 'frequency' })
  frequency: number;

  @Column({ type: 'decimal', name: 'value', precision: 10, scale: 2, nullable: true })
  value: number;

  @Column({ type: 'simple-enum', name: 'repetition', enum: RepetitionType })
  repetition: RepetitionType;

  @ManyToMany(type => Civilian)
  civilians: Civilian[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
