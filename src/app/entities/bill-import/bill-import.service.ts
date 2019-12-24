import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBillImport } from 'app/shared/model/bill-import.model';

type EntityResponseType = HttpResponse<IBillImport>;
type EntityArrayResponseType = HttpResponse<IBillImport[]>;

@Injectable({ providedIn: 'root' })
export class BillImportService {
  public resourceUrl = SERVER_API_URL + 'api/bill-imports';

  constructor(protected http: HttpClient) {}

  create(billImport: IBillImport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(billImport);
    return this.http
      .post<IBillImport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(billImport: IBillImport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(billImport);
    return this.http
      .put<IBillImport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBillImport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBillImport[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(billImport: IBillImport): IBillImport {
    const copy: IBillImport = Object.assign({}, billImport, {
      date: billImport.date != null && billImport.date.isValid() ? billImport.date.format(DATE_FORMAT) : null
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
      res.body.forEach((billImport: IBillImport) => {
        billImport.date = billImport.date != null ? moment(billImport.date) : null;
      });
    }
    return res;
  }
}
