import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ICivilian, Civilian } from 'app/shared/model/civilian.model';
import { CivilianService } from './civilian.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IBenefit } from 'app/shared/model/benefit.model';
import { BenefitService } from 'app/entities/benefit/benefit.service';
import { IResidence } from 'app/shared/model/residence.model';
import { ResidenceService } from 'app/entities/residence/residence.service';

type SelectableEntity = IBenefit | IResidence;

@Component({
  selector: 'jhi-civilian-update',
  templateUrl: './civilian-update.component.html'
})
export class CivilianUpdateComponent implements OnInit {
  isSaving = false;
  benefits: IBenefit[] = [];
  residences: IResidence[] = [];
  dateOfBirthDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    identityNo: [null, [Validators.minLength(16), Validators.maxLength(16)]],
    identityCardImage: [],
    identityCardImageContentType: [],
    dateOfBirth: [null, [Validators.required]],
    placeOfBirth: [null, [Validators.required]],
    contact: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    status: [null, [Validators.required]],
    additionalInfo: [],
    yearlyIncome: [],
    benefits: [],
    residence: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected civilianService: CivilianService,
    protected benefitService: BenefitService,
    protected residenceService: ResidenceService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ civilian }) => {
      this.updateForm(civilian);

      this.benefitService.query().subscribe((res: HttpResponse<IBenefit[]>) => (this.benefits = res.body || []));

      this.residenceService.query().subscribe((res: HttpResponse<IResidence[]>) => (this.residences = res.body || []));
    });
  }

  updateForm(civilian: ICivilian): void {
    this.editForm.patchValue({
      id: civilian.id,
      name: civilian.name,
      identityNo: civilian.identityNo,
      identityCardImage: civilian.identityCardImage,
      identityCardImageContentType: civilian.identityCardImageContentType,
      dateOfBirth: civilian.dateOfBirth,
      placeOfBirth: civilian.placeOfBirth,
      contact: civilian.contact,
      gender: civilian.gender,
      status: civilian.status,
      additionalInfo: civilian.additionalInfo,
      yearlyIncome: civilian.yearlyIncome,
      benefits: civilian.benefits,
      residence: civilian.residence
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('civilianManagementApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const civilian = this.createFromForm();
    if (civilian.id !== undefined) {
      this.subscribeToSaveResponse(this.civilianService.update(civilian));
    } else {
      this.subscribeToSaveResponse(this.civilianService.create(civilian));
    }
  }

  private createFromForm(): ICivilian {
    return {
      ...new Civilian(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      identityNo: this.editForm.get(['identityNo'])!.value,
      identityCardImageContentType: this.editForm.get(['identityCardImageContentType'])!.value,
      identityCardImage: this.editForm.get(['identityCardImage'])!.value,
      dateOfBirth: this.editForm.get(['dateOfBirth'])!.value,
      placeOfBirth: this.editForm.get(['placeOfBirth'])!.value,
      contact: this.editForm.get(['contact'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      status: this.editForm.get(['status'])!.value,
      additionalInfo: this.editForm.get(['additionalInfo'])!.value,
      yearlyIncome: this.editForm.get(['yearlyIncome'])!.value,
      benefits: this.editForm.get(['benefits'])!.value,
      residence: this.editForm.get(['residence'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICivilian>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IBenefit[], option: IBenefit): IBenefit {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
