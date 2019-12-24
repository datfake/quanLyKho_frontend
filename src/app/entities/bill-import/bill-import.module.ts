import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QuanlyWareHouseSharedModule } from 'app/shared/shared.module';
import { BillImportComponent } from './bill-import.component';
import { BillImportDetailComponent } from './bill-import-detail.component';
import { BillImportUpdateComponent } from './bill-import-update.component';
import { BillImportDeleteDialogComponent } from './bill-import-delete-dialog.component';
import { billImportRoute } from './bill-import.route';

@NgModule({
  imports: [QuanlyWareHouseSharedModule, RouterModule.forChild(billImportRoute)],
  declarations: [BillImportComponent, BillImportDetailComponent, BillImportUpdateComponent, BillImportDeleteDialogComponent],
  entryComponents: [BillImportDeleteDialogComponent]
})
export class QuanlyWareHouseBillImportModule {}
