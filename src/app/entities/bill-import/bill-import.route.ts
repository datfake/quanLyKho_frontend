import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BillImport } from 'app/shared/model/bill-import.model';
import { BillImportService } from './bill-import.service';
import { BillImportComponent } from './bill-import.component';
import { BillImportDetailComponent } from './bill-import-detail.component';
import { BillImportUpdateComponent } from './bill-import-update.component';
import { IBillImport } from 'app/shared/model/bill-import.model';

@Injectable({ providedIn: 'root' })
export class BillImportResolve implements Resolve<IBillImport> {
  constructor(private service: BillImportService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBillImport> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((billImport: HttpResponse<BillImport>) => billImport.body));
    }
    return of(new BillImport());
  }
}

export const billImportRoute: Routes = [
  {
    path: '',
    component: BillImportComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'quanlyWareHouseApp.billImport.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BillImportDetailComponent,
    resolve: {
      billImport: BillImportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'quanlyWareHouseApp.billImport.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BillImportUpdateComponent,
    resolve: {
      billImport: BillImportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'quanlyWareHouseApp.billImport.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BillImportUpdateComponent,
    resolve: {
      billImport: BillImportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'quanlyWareHouseApp.billImport.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
