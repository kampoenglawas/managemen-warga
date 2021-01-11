import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBenefit, Benefit } from 'app/shared/model/benefit.model';
import { BenefitService } from './benefit.service';

@Component({
  selector: 'jhi-benefit-update',
  templateUrl: './benefit-update.component.html'
})
export class BenefitUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    type: [null, [Validators.required]],
    frequency: [null, [Validators.required]],
    value: [],
    repetition: [null, [Validators.required]]
  });

  constructor(protected benefitService: BenefitService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ benefit }) => {
      this.updateForm(benefit);
    });
  }

  updateForm(benefit: IBenefit): void {
    this.editForm.patchValue({
      id: benefit.id,
      description: benefit.description,
      type: benefit.type,
      frequency: benefit.frequency,
      value: benefit.value,
      repetition: benefit.repetition
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const benefit = this.createFromForm();
    if (benefit.id !== undefined) {
      this.subscribeToSaveResponse(this.benefitService.update(benefit));
    } else {
      this.subscribeToSaveResponse(this.benefitService.create(benefit));
    }
  }

  private createFromForm(): IBenefit {
    return {
      ...new Benefit(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      type: this.editForm.get(['type'])!.value,
      frequency: this.editForm.get(['frequency'])!.value,
      value: this.editForm.get(['value'])!.value,
      repetition: this.editForm.get(['repetition'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBenefit>>): void {
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
}
