import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBillExport } from 'app/shared/model/bill-export.model';
import { BillExportService } from './bill-export.service';

@Component({
  templateUrl: './bill-export-delete-dialog.component.html'
})
export class BillExportDeleteDialogComponent {
  billExport: IBillExport;

  constructor(
    protected billExportService: BillExportService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.billExportService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'billExportListModification',
        content: 'Deleted an billExport'
      });
      this.activeModal.dismiss(true);
    });
  }
}
