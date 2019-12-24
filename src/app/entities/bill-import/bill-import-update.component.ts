import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IBillImport, BillImport } from 'app/shared/model/bill-import.model';
import { BillImportService } from './bill-import.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

@Component({
  selector: 'jhi-bill-import-update',
  templateUrl: './bill-import-update.component.html'
})
export class BillImportUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProduct[];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    amount: [],
    date: [],
    charge: [],
    product: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected billImportService: BillImportService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ billImport }) => {
      this.updateForm(billImport);
    });
    this.productService
      .query()
      .subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(billImport: IBillImport) {
    this.editForm.patchValue({
      id: billImport.id,
      amount: billImport.amount,
      date: billImport.date,
      charge: billImport.charge,
      product: billImport.product
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const billImport = this.createFromForm();
    if (billImport.id !== undefined) {
      this.subscribeToSaveResponse(this.billImportService.update(billImport));
    } else {
      this.subscribeToSaveResponse(this.billImportService.create(billImport));
    }
  }

  private createFromForm(): IBillImport {
    return {
      ...new BillImport(),
      id: this.editForm.get(['id']).value,
      amount: this.editForm.get(['amount']).value,
      date: this.editForm.get(['date']).value,
      charge: this.editForm.get(['charge']).value,
      product: this.editForm.get(['product']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBillImport>>) {
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
}
