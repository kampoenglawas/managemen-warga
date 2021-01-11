import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRT } from 'app/shared/model/rt.model';

@Component({
  selector: 'jhi-rt-detail',
  templateUrl: './rt-detail.component.html'
})
export class RTDetailComponent implements OnInit {
  rT: IRT | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rT }) => (this.rT = rT));
  }

  previousState(): void {
    window.history.back();
  }
}
