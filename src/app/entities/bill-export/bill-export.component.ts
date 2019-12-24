import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { BillExportService } from './bill-export.service';
import { BillExportDeleteDialogComponent } from './bill-export-delete-dialog.component';
import { IBillExport } from 'src/app/shared/model/bill-export.model';

@Component({
  selector: 'jhi-bill-export',
  templateUrl: './bill-export.component.html'
})
export class BillExportComponent implements OnInit, OnDestroy {
  billExports: IBillExport[];
  eventSubscriber: Subscription;

  constructor(protected billExportService: BillExportService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.billExportService.query().subscribe((res: HttpResponse<IBillExport[]>) => {
      this.billExports = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInBillExports();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBillExport) {
    return item.id;
  }

  registerChangeInBillExports() {
    this.eventSubscriber = this.eventManager.subscribe('billExportListModification', () => this.loadAll());
  }

  delete(billExport: IBillExport) {
    const modalRef = this.modalService.open(BillExportDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.billExport = billExport;
  }
}
