import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBillImport } from 'app/shared/model/bill-import.model';
import { BillImportService } from './bill-import.service';

@Component({
  templateUrl: './bill-import-delete-dialog.component.html'
})
export class BillImportDeleteDialogComponent {
  billImport: IBillImport;

  constructor(
    protected billImportService: BillImportService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.billImportService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'billImportListModification',
        content: 'Deleted an billImport'
      });
      this.activeModal.dismiss(true);
    });
  }
}
