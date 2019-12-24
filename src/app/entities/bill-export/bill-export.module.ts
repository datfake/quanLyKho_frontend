import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { BillExportComponent } from './bill-export.component';
import { BillExportDetailComponent } from './bill-export-detail.component';
import { BillExportUpdateComponent } from './bill-export-update.component';
import { BillExportDeleteDialogComponent } from './bill-export-delete-dialog.component';
import { billExportRoute } from './bill-export.route';
import { QuanlyWareHouseSharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [QuanlyWareHouseSharedModule, RouterModule.forChild(billExportRoute)],
  declarations: [BillExportComponent, BillExportDetailComponent, BillExportUpdateComponent, BillExportDeleteDialogComponent],
  entryComponents: [BillExportDeleteDialogComponent]
})
export class QuanlyWareHouseBillExportModule {}
