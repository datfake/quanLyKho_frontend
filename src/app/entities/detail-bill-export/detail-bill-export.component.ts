import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetailBillExport } from 'app/shared/model/detail-bill-export.model';
import { DetailBillExportService } from './detail-bill-export.service';
import { DetailBillExportDeleteDialogComponent } from './detail-bill-export-delete-dialog.component';

@Component({
  selector: 'jhi-detail-bill-export',
  templateUrl: './detail-bill-export.component.html'
})
export class DetailBillExportComponent implements OnInit, OnDestroy {
  detailBillExports: IDetailBillExport[];
  eventSubscriber: Subscription;

  constructor(
    protected detailBillExportService: DetailBillExportService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.detailBillExportService.query().subscribe((res: HttpResponse<IDetailBillExport[]>) => {
      this.detailBillExports = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInDetailBillExports();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDetailBillExport) {
    return item.id;
  }

  registerChangeInDetailBillExports() {
    this.eventSubscriber = this.eventManager.subscribe('detailBillExportListModification', () => this.loadAll());
  }

  delete(detailBillExport: IDetailBillExport) {
    const modalRef = this.modalService.open(DetailBillExportDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detailBillExport = detailBillExport;
  }
}
