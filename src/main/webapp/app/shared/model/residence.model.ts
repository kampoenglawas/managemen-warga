import { ICivilian } from 'app/shared/model/civilian.model';
import { IRT } from 'app/shared/model/rt.model';

export interface IResidence {
  id?: number;
  no?: string;
  fullAddress?: string;
  description?: string;
  members?: ICivilian[];
  rT?: IRT;
}

export class Residence implements IResidence {
  constructor(
    public id?: number,
    public no?: string,
    public fullAddress?: string,
    public description?: string,
    public members?: ICivilian[],
    public rT?: IRT
  ) {}
}
