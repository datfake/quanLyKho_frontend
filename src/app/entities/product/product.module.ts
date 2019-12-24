import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QuanlyWareHouseSharedModule } from 'app/shared/shared.module';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductUpdateComponent } from './product-update.component';
import { ProductDeleteDialogComponent } from './product-delete-dialog.component';
import { productRoute } from './product.route';

@NgModule({
  imports: [QuanlyWareHouseSharedModule, RouterModule.forChild(productRoute)],
  declarations: [ProductComponent, ProductDetailComponent, ProductUpdateComponent, ProductDeleteDialogComponent],
  entryComponents: [ProductDeleteDialogComponent]
})
export class QuanlyWareHouseProductModule {}
