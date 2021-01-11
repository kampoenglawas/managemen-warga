import { Moment } from 'moment';
import { IBenefit } from 'app/shared/model/benefit.model';
import { IFamilyMember } from 'app/shared/model/family-member.model';
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
  contact?: string;
  gender?: Gender;
  status?: MemberStatus;
  additionalInfo?: string;
  yearlyIncome?: number;
  benefits?: IBenefit[];
  familyMember?: IFamilyMember;
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
    public contact?: string,
    public gender?: Gender,
    public status?: MemberStatus,
    public additionalInfo?: string,
    public yearlyIncome?: number,
    public benefits?: IBenefit[],
    public familyMember?: IFamilyMember,
    public residence?: IResidence
  ) {}
}
