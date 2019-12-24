import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';

export interface IBillImport {
  id?: number;
  amount?: number;
  date?: Moment;
  charge?: number;
  product?: IProduct;
}

export class BillImport implements IBillImport {
  constructor(public id?: number, public amount?: number, public date?: Moment, public charge?: number, public product?: IProduct) {}
}
