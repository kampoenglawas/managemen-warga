import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPovertyCivilian } from 'app/shared/model/poverty-civilian.model';

@Component({
  selector: 'jhi-poverty-civilian-detail',
  templateUrl: './poverty-civilian-detail.component.html'
})
export class PovertyCivilianDetailComponent implements OnInit {
  povertyCivilian: IPovertyCivilian | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ povertyCivilian }) => (this.povertyCivilian = povertyCivilian));
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
