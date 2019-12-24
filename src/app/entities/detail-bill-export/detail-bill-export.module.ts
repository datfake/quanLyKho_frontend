import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QuanlyWareHouseSharedModule } from 'app/shared/shared.module';
import { DetailBillExportComponent } from './detail-bill-export.component';
import { DetailBillExportDetailComponent } from './detail-bill-export-detail.component';
import { DetailBillExportUpdateComponent } from './detail-bill-export-update.component';
import { DetailBillExportDeleteDialogComponent } from './detail-bill-export-delete-dialog.component';
import { detailBillExportRoute } from './detail-bill-export.route';

@NgModule({
  imports: [QuanlyWareHouseSharedModule, RouterModule.forChild(detailBillExportRoute)],
  declarations: [
    DetailBillExportComponent,
    DetailBillExportDetailComponent,
    DetailBillExportUpdateComponent,
    DetailBillExportDeleteDialogComponent
  ],
  entryComponents: [DetailBillExportDeleteDialogComponent]
})
export class QuanlyWareHouseDetailBillExportModule {}
