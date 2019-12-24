import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { map } from 'rxjs/operators';
import { IBillExport } from 'src/app/shared/model/bill-export.model';
import { SERVER_API_URL } from 'src/app/app.constants';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { DATE_FORMAT } from 'src/app/shared/constants/input.constants';



type EntityResponseType = HttpResponse<IBillExport>;
type EntityArrayResponseType = HttpResponse<IBillExport[]>;

@Injectable({ providedIn: 'root' })
export class BillExportService {
  public resourceUrl = SERVER_API_URL + 'api/bill-exports';

  constructor(protected http: HttpClient) {}

  create(billExport: IBillExport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(billExport);
    return this.http
      .post<IBillExport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(billExport: IBillExport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(billExport);
    return this.http
      .put<IBillExport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBillExport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBillExport[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(billExport: IBillExport): IBillExport {
    const copy: IBillExport = Object.assign({}, billExport, {
      date: billExport.date != null && billExport.date.isValid() ? billExport.date.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((billExport: IBillExport) => {
        billExport.date = billExport.date != null ? moment(billExport.date) : null;
      });
    }
    return res;
  }
}
