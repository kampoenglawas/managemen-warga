import { IResidence } from 'app/shared/model/residence.model';

export interface IRT {
  id?: number;
  name?: string;
  residences?: IResidence[];
}

export class RT implements IRT {
  constructor(public id?: number, public name?: string, public residences?: IResidence[]) {}
}
