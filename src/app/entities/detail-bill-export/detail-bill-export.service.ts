import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDetailBillExport } from 'app/shared/model/detail-bill-export.model';

type EntityResponseType = HttpResponse<IDetailBillExport>;
type EntityArrayResponseType = HttpResponse<IDetailBillExport[]>;

@Injectable({ providedIn: 'root' })
export class DetailBillExportService {
  public resourceUrl = SERVER_API_URL + 'api/detail-bill-exports';

  constructor(protected http: HttpClient) {}

  create(detailBillExport: IDetailBillExport): Observable<EntityResponseType> {
    return this.http.post<IDetailBillExport>(this.resourceUrl, detailBillExport, { observe: 'response' });
  }

  update(detailBillExport: IDetailBillExport): Observable<EntityResponseType> {
    return this.http.put<IDetailBillExport>(this.resourceUrl, detailBillExport, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetailBillExport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetailBillExport[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
