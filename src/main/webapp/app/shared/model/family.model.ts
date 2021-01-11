import { IFamilyMember } from 'app/shared/model/family-member.model';

export interface IFamily {
  id?: number;
  familyCardNo?: string;
  familyCardImageContentType?: string;
  familyCardImage?: any;
  members?: IFamilyMember[];
}

export class Family implements IFamily {
  constructor(
    public id?: number,
    public familyCardNo?: string,
    public familyCardImageContentType?: string,
    public familyCardImage?: any,
    public members?: IFamilyMember[]
  ) {}
}
