import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ICivilian } from 'app/shared/model/civilian.model';

@Component({
  selector: 'jhi-civilian-detail',
  templateUrl: './civilian-detail.component.html'
})
export class CivilianDetailComponent implements OnInit {
  civilian: ICivilian | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ civilian }) => (this.civilian = civilian));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
