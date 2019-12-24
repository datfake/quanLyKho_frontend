import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBillExport } from 'app/shared/model/bill-export.model';

@Component({
  selector: 'jhi-bill-export-detail',
  templateUrl: './bill-export-detail.component.html'
})
export class BillExportDetailComponent implements OnInit {
  billExport: IBillExport;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ billExport }) => {
      this.billExport = billExport;
    });
  }

  previousState() {
    window.history.back();
  }
}
