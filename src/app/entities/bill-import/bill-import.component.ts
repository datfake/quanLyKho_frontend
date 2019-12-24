import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { BillImportService } from './bill-import.service';
import { BillImportDeleteDialogComponent } from './bill-import-delete-dialog.component';
import { IBillImport } from 'src/app/shared/model/bill-import.model';

@Component({
  selector: 'jhi-bill-import',
  templateUrl: './bill-import.component.html'
})
export class BillImportComponent implements OnInit, OnDestroy {
  billImports: IBillImport[];
  eventSubscriber: Subscription;

  constructor(protected billImportService: BillImportService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.billImportService.query().subscribe((res: HttpResponse<IBillImport[]>) => {
      this.billImports = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInBillImports();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBillImport) {
    return item.id;
  }

  registerChangeInBillImports() {
    this.eventSubscriber = this.eventManager.subscribe('billImportListModification', () => this.loadAll());
  }

  delete(billImport: IBillImport) {
    const modalRef = this.modalService.open(BillImportDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.billImport = billImport;
  }
}
