import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';
import { ICustomer } from 'app/shared/model/customer.model';

export interface IBillExport {
  id?: number;
  date?: Moment;
  priceTotal?: number;
  amount?: number;
  product?: IProduct;
  customer?: ICustomer;
}

export class BillExport implements IBillExport {
  constructor(
    public id?: number,
    public date?: Moment,
    public priceTotal?: number,
    public amount?: number,
    public product?: IProduct,
    public customer?: ICustomer
  ) {}
}
