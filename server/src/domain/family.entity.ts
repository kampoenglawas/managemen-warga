/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { FamilyMember } from './family-member.entity';

/**
 * A Family.
 */
@Entity('family')
export class Family extends BaseEntity {
  @Column({ name: 'family_card_no' })
  familyCardNo: string;

  @Column({ type: 'blob', name: 'family_card_image', nullable: true })
  familyCardImage: any;

  @Column({ name: 'family_card_image_content_type', nullable: true })
  familyCardImageContentType: string;

  @OneToMany(
    type => FamilyMember,
    other => other.family
  )
  members: FamilyMember[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
