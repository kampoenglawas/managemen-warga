/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Civilian from './civilian.entity';
import Family from './family.entity';
import { FamilyRole } from './enumeration/family-role';

/**
 * A FamilyMember.
 */
@Entity('family_member')
export default class FamilyMember extends BaseEntity {
  @Column({ type: 'simple-enum', name: 'role', enum: FamilyRole })
  role: FamilyRole;

  @OneToOne(
    type => Civilian,
    other => other.familyMember
  )
  @JoinColumn()
  civilian: Civilian;

  @ManyToOne(type => Family)
  family: Family;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
