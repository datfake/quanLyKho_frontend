import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { BillExportService } from './bill-export.service';
import { BillExportComponent } from './bill-export.component';
import { BillExportDetailComponent } from './bill-export-detail.component';
import { BillExportUpdateComponent } from './bill-export-update.component';
import { IBillExport, BillExport } from 'src/app/shared/model/bill-export.model';
import { UserRouteAccessService } from 'src/app/core/auth/user-route-access-service';


@Injectable({ providedIn: 'root' })
export class BillExportResolve implements Resolve<IBillExport> {
  constructor(private service: BillExportService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBillExport> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((billExport: HttpResponse<BillExport>) => billExport.body));
    }
    return of(new BillExport());
  }
}

export const billExportRoute: Routes = [
  {
    path: '',
    component: BillExportComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'quanlyWareHouseApp.billExport.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BillExportDetailComponent,
    resolve: {
      billExport: BillExportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'quanlyWareHouseApp.billExport.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BillExportUpdateComponent,
    resolve: {
      billExport: BillExportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'quanlyWareHouseApp.billExport.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BillExportUpdateComponent,
    resolve: {
      billExport: BillExportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'quanlyWareHouseApp.billExport.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
