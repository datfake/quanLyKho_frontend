import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IDetailBillExport, DetailBillExport } from 'app/shared/model/detail-bill-export.model';
import { DetailBillExportService } from './detail-bill-export.service';
import { IBillExport } from 'app/shared/model/bill-export.model';
import { BillExportService } from 'app/entities/bill-export/bill-export.service';

@Component({
  selector: 'jhi-detail-bill-export-update',
  templateUrl: './detail-bill-export-update.component.html'
})
export class DetailBillExportUpdateComponent implements OnInit {
  isSaving: boolean;

  billexports: IBillExport[];

  editForm = this.fb.group({
    id: [],
    amount: [],
    billExport: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected detailBillExportService: DetailBillExportService,
    protected billExportService: BillExportService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ detailBillExport }) => {
      this.updateForm(detailBillExport);
    });
    this.billExportService
      .query()
      .subscribe(
        (res: HttpResponse<IBillExport[]>) => (this.billexports = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(detailBillExport: IDetailBillExport) {
    this.editForm.patchValue({
      id: detailBillExport.id,
      amount: detailBillExport.amount,
      billExport: detailBillExport.billExport
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const detailBillExport = this.createFromForm();
    if (detailBillExport.id !== undefined) {
      this.subscribeToSaveResponse(this.detailBillExportService.update(detailBillExport));
    } else {
      this.subscribeToSaveResponse(this.detailBillExportService.create(detailBillExport));
    }
  }

  private createFromForm(): IDetailBillExport {
    return {
      ...new DetailBillExport(),
      id: this.editForm.get(['id']).value,
      amount: this.editForm.get(['amount']).value,
      billExport: this.editForm.get(['billExport']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetailBillExport>>) {
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

  trackBillExportById(index: number, item: IBillExport) {
    return item.id;
  }
}
