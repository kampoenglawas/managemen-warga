import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IResidence, Residence } from 'app/shared/model/residence.model';
import { ResidenceService } from './residence.service';
import { IRT } from 'app/shared/model/rt.model';
import { RTService } from 'app/entities/rt/rt.service';

@Component({
  selector: 'jhi-residence-update',
  templateUrl: './residence-update.component.html'
})
export class ResidenceUpdateComponent implements OnInit {
  isSaving = false;
  rts: IRT[] = [];

  editForm = this.fb.group({
    id: [],
    no: [null, [Validators.required]],
    fullAddress: [null, [Validators.required]],
    description: [],
    rT: []
  });

  constructor(
    protected residenceService: ResidenceService,
    protected rTService: RTService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ residence }) => {
      this.updateForm(residence);

      this.rTService.query().subscribe((res: HttpResponse<IRT[]>) => (this.rts = res.body || []));
    });
  }

  updateForm(residence: IResidence): void {
    this.editForm.patchValue({
      id: residence.id,
      no: residence.no,
      fullAddress: residence.fullAddress,
      description: residence.description,
      rT: residence.rT
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const residence = this.createFromForm();
    if (residence.id !== undefined) {
      this.subscribeToSaveResponse(this.residenceService.update(residence));
    } else {
      this.subscribeToSaveResponse(this.residenceService.create(residence));
    }
  }

  private createFromForm(): IResidence {
    return {
      ...new Residence(),
      id: this.editForm.get(['id'])!.value,
      no: this.editForm.get(['no'])!.value,
      fullAddress: this.editForm.get(['fullAddress'])!.value,
      description: this.editForm.get(['description'])!.value,
      rT: this.editForm.get(['rT'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResidence>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IRT): any {
    return item.id;
  }
}
