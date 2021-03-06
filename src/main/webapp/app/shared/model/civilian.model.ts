import { Moment } from 'moment';
import { IBenefit } from 'app/shared/model/benefit.model';
import { IFamilyMember } from 'app/shared/model/family-member.model';
import { IPovertyCivilian } from 'app/shared/model/poverty-civilian.model';
import { IResidence } from 'app/shared/model/residence.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { MemberStatus } from 'app/shared/model/enumerations/member-status.model';

export interface ICivilian {
  id?: number;
  name?: string;
  identityNo?: string;
  identityCardImageContentType?: string;
  identityCardImage?: any;
  dateOfBirth?: Moment;
  placeOfBirth?: string;
  gender?: Gender;
  additionalInfo?: string;
  yearlyIncome?: number;
  contact?: string;
  status?: MemberStatus;
  benefits?: IBenefit[];
  familyMember?: IFamilyMember;
  povertyCivilian?: IPovertyCivilian;
  residence?: IResidence;
}

export class Civilian implements ICivilian {
  constructor(
    public id?: number,
    public name?: string,
    public identityNo?: string,
    public identityCardImageContentType?: string,
    public identityCardImage?: any,
    public dateOfBirth?: Moment,
    public placeOfBirth?: string,
    public gender?: Gender,
    public additionalInfo?: string,
    public yearlyIncome?: number,
    public contact?: string,
    public status?: MemberStatus,
    public benefits?: IBenefit[],
    public familyMember?: IFamilyMember,
    public povertyCivilian?: IPovertyCivilian,
    public residence?: IResidence
  ) {}
}
