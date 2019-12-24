import { IBillExport } from 'app/shared/model/bill-export.model';

export interface IDetailBillExport {
  id?: number;
  amount?: number;
  billExport?: IBillExport;
}

export class DetailBillExport implements IDetailBillExport {
  constructor(public id?: number, public amount?: number, public billExport?: IBillExport) {}
}
