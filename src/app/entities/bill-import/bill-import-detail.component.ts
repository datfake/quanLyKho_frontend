import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBillImport } from 'app/shared/model/bill-import.model';

@Component({
  selector: 'jhi-bill-import-detail',
  templateUrl: './bill-import-detail.component.html'
})
export class BillImportDetailComponent implements OnInit {
  billImport: IBillImport;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ billImport }) => {
      this.billImport = billImport;
    });
  }

  previousState() {
    window.history.back();
  }
}
