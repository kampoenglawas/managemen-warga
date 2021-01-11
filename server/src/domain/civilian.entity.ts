/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Benefit } from './benefit.entity';
import { FamilyMember } from './family-member.entity';
import { PovertyCivilian } from './poverty-civilian.entity';
import { Residence } from './residence.entity';
import { Gender } from './enumeration/gender';
import { MemberStatus } from './enumeration/member-status';

/**
 * A Civilian.
 */
@Entity('civilian')
export class Civilian extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'identity_no', length: 16, nullable: true })
  identityNo: string;

  @Column({ type: 'blob', name: 'identity_card_image', nullable: true })
  identityCardImage: any;

  @Column({ name: 'identity_card_image_content_type', nullable: true })
  identityCardImageContentType: string;

  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth: any;

  @Column({ name: 'place_of_birth' })
  placeOfBirth: string;

  @Column({ type: 'simple-enum', name: 'gender', enum: Gender })
  gender: Gender;

  @Column({ name: 'additional_info', nullable: true })
  additionalInfo: string;

  @Column({ type: 'decimal', name: 'yearly_income', precision: 10, scale: 2, nullable: true })
  yearlyIncome: number;

  @Column({ name: 'contact' })
  contact: string;

  @Column({ type: 'simple-enum', name: 'status', enum: MemberStatus })
  status: MemberStatus;

  @ManyToMany(type => Benefit)
  @JoinTable({
    name: 'civilian_benefit',
    joinColumn: { name: 'civilian_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'benefit_id', referencedColumnName: 'id' }
  })
  benefits: Benefit[];

  @OneToOne(type => FamilyMember)
  familyMember: FamilyMember;

  @OneToOne(type => PovertyCivilian)
  povertyCivilian: PovertyCivilian;

  @ManyToOne(type => Residence)
  residence: Residence;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
