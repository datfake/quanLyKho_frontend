import { Moment } from 'moment';

export interface ICustomer {
  id?: number;
  name?: string;
  birthday?: Moment;
  adress?: string;
  phone?: string;
}

export class Customer implements ICustomer {
  constructor(public id?: number, public name?: string, public birthday?: Moment, public adress?: string, public phone?: string) {}
}
