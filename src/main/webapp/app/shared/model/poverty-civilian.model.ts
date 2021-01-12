import { ICivilian } from 'app/shared/model/civilian.model';

export interface IPovertyCivilian {
  id?: number;
  reason?: any;
  civilian?: ICivilian;
}

export interface IPovertyRatio {
  total?: number;
  size?: number;
}

export class PovertyCivilian implements IPovertyCivilian {
  constructor(public id?: number, public reason?: any, public civilian?: ICivilian) {}
}
