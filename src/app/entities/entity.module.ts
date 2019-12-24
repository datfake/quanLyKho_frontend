import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'brand',
        loadChildren: () => import('./brand/brand.module').then(m => m.QuanlyWareHouseBrandModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.QuanlyWareHouseCategoryModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.QuanlyWareHouseProductModule)
      },
      {
        path: 'bill-import',
        loadChildren: () => import('./bill-import/bill-import.module').then(m => m.QuanlyWareHouseBillImportModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.QuanlyWareHouseCustomerModule)
      },
      {
        path: 'bill-export',
        loadChildren: () => import('./bill-export/bill-export.module').then(m => m.QuanlyWareHouseBillExportModule)
      },
      {
        path: 'detail-bill-export',
        loadChildren: () => import('./detail-bill-export/detail-bill-export.module').then(m => m.QuanlyWareHouseDetailBillExportModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class QuanlyWareHouseEntityModule {}
