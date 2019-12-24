import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { BillExportService } from './bill-export.service';

@Component({
  selector: 'jhi-bill-export-update',
  templateUrl: './bill-export-update.component.html'
})
export class BillExportUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProduct[];
  customers: ICustomer[];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [],
    //priceTotal: [],
    amount: [],
    product: [],
    customer: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected billExportService: BillExportService,
    protected productService: ProductService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ billExport }) => {
      this.updateForm(billExport);
    });
    this.productService
      .query()
      .subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.customerService
      .query()
      .subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(billExport: IBillExport) {
    this.editForm.patchValue({
      id: billExport.id,
      date: billExport.date,
      priceTotal: billExport.priceTotal,
      amount: billExport.amount,
      product: billExport.product,
      customer: billExport.customer
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const billExport = this.createFromForm();
    if (billExport.id !== undefined) {
      this.subscribeToSaveResponse(this.billExportService.update(billExport));
    } else {
      this.subscribeToSaveResponse(this.billExportService.create(billExport));
    }
  }

  private createFromForm(): IBillExport {
    return {
      ...new BillExport(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value,
      //priceTotal: this.editForm.get(['priceTotal']).value,
      amount: this.editForm.get(['amount']).value,
      product: this.editForm.get(['product']).value,
      customer: this.editForm.get(['customer']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBillExport>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }

  trackCustomerById(index: number, item: ICustomer) {
    return item.id;
  }
}
