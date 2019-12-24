import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetailBillExport } from 'app/shared/model/detail-bill-export.model';
import { DetailBillExportService } from './detail-bill-export.service';
import { DetailBillExportComponent } from './detail-bill-export.component';
import { DetailBillExportDetailComponent } from './detail-bill-export-detail.component';
import { DetailBillExportUpdateComponent } from './detail-bill-export-update.component';
import { IDetailBillExport } from 'app/shared/model/detail-bill-export.model';

@Injectable({ providedIn: 'root' })
export class DetailBillExportResolve implements Resolve<IDetailBillExport> {
  constructor(private service: DetailBillExportService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDetailBillExport> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((detailBillExport: HttpResponse<DetailBillExport>) => detailBillExport.body));
    }
    return of(new DetailBillExport());
  }
}

export const detailBillExportRoute: Routes = [
  {
    path: '',
    component: DetailBillExportComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'quanlyWareHouseApp.detailBillExport.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DetailBillExportDetailComponent,
    resolve: {
      detailBillExport: DetailBillExportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'quanlyWareHouseApp.detailBillExport.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DetailBillExportUpdateComponent,
    resolve: {
      detailBillExport: DetailBillExportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'quanlyWareHouseApp.detailBillExport.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DetailBillExportUpdateComponent,
    resolve: {
      detailBillExport: DetailBillExportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'quanlyWareHouseApp.detailBillExport.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
