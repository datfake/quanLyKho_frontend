import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetailBillExport } from 'app/shared/model/detail-bill-export.model';
import { DetailBillExportService } from './detail-bill-export.service';

@Component({
  templateUrl: './detail-bill-export-delete-dialog.component.html'
})
export class DetailBillExportDeleteDialogComponent {
  detailBillExport: IDetailBillExport;

  constructor(
    protected detailBillExportService: DetailBillExportService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.detailBillExportService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'detailBillExportListModification',
        content: 'Deleted an detailBillExport'
      });
      this.activeModal.dismiss(true);
    });
  }
}
