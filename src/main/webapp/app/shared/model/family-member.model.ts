import { ICivilian } from 'app/shared/model/civilian.model';
import { IFamily } from 'app/shared/model/family.model';
import { FamilyRole } from 'app/shared/model/enumerations/family-role.model';

export interface IFamilyMember {
  id?: number;
  role?: FamilyRole;
  civilian?: ICivilian;
  family?: IFamily;
}

export class FamilyMember implements IFamilyMember {
  constructor(public id?: number, public role?: FamilyRole, public civilian?: ICivilian, public family?: IFamily) {}
}
