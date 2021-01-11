import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResidence } from 'app/shared/model/residence.model';

@Component({
  selector: 'jhi-residence-detail',
  templateUrl: './residence-detail.component.html'
})
export class ResidenceDetailComponent implements OnInit {
  residence: IResidence | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ residence }) => (this.residence = residence));
  }

  previousState(): void {
    window.history.back();
  }
}
