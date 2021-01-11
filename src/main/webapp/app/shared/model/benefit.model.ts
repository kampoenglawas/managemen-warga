import { ICivilian } from 'app/shared/model/civilian.model';
import { BenefitType } from 'app/shared/model/enumerations/benefit-type.model';
import { RepetitionType } from 'app/shared/model/enumerations/repetition-type.model';

export interface IBenefit {
  id?: number;
  description?: string;
  type?: BenefitType;
  value?: number;
  frequency?: number;
  repetition?: RepetitionType;
  civilians?: ICivilian[];
}

export class Benefit implements IBenefit {
  constructor(
    public id?: number,
    public description?: string,
    public type?: BenefitType,
    public value?: number,
    public frequency?: number,
    public repetition?: RepetitionType,
    public civilians?: ICivilian[]
  ) {}
}
