import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetailBillExport } from 'app/shared/model/detail-bill-export.model';

@Component({
  selector: 'jhi-detail-bill-export-detail',
  templateUrl: './detail-bill-export-detail.component.html'
})
export class DetailBillExportDetailComponent implements OnInit {
  detailBillExport: IDetailBillExport;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detailBillExport }) => {
      this.detailBillExport = detailBillExport;
    });
  }

  previousState() {
    window.history.back();
  }
}
