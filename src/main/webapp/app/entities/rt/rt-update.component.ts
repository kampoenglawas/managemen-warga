import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRT, RT } from 'app/shared/model/rt.model';
import { RTService } from './rt.service';

@Component({
  selector: 'jhi-rt-update',
  templateUrl: './rt-update.component.html'
})
export class RTUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected rTService: RTService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rT }) => {
      this.updateForm(rT);
    });
  }

  updateForm(rT: IRT): void {
    this.editForm.patchValue({
      id: rT.id,
      name: rT.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rT = this.createFromForm();
    if (rT.id !== undefined) {
      this.subscribeToSaveResponse(this.rTService.update(rT));
    } else {
      this.subscribeToSaveResponse(this.rTService.create(rT));
    }
  }

  private createFromForm(): IRT {
    return {
      ...new RT(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRT>>): void {
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
