import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IPovertyCivilian, PovertyCivilian } from 'app/shared/model/poverty-civilian.model';
import { PovertyCivilianService } from './poverty-civilian.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ICivilian } from 'app/shared/model/civilian.model';
import { CivilianService } from 'app/entities/civilian/civilian.service';

@Component({
  selector: 'jhi-poverty-civilian-update',
  templateUrl: './poverty-civilian-update.component.html'
})
export class PovertyCivilianUpdateComponent implements OnInit {
  isSaving = false;
  civilians: ICivilian[] = [];

  editForm = this.fb.group({
    id: [],
    reason: [],
    civilian: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected povertyCivilianService: PovertyCivilianService,
    protected civilianService: CivilianService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ povertyCivilian }) => {
      this.updateForm(povertyCivilian);

      this.civilianService
        .query({ filter: 'povertycivilian-is-null' })
        .pipe(
          map((res: HttpResponse<ICivilian[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICivilian[]) => {
          if (!povertyCivilian.civilian || !povertyCivilian.civilian.id) {
            this.civilians = resBody;
          } else {
            this.civilianService
              .find(povertyCivilian.civilian.id)
              .pipe(
                map((subRes: HttpResponse<ICivilian>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICivilian[]) => (this.civilians = concatRes));
          }
        });
    });
  }

  updateForm(povertyCivilian: IPovertyCivilian): void {
    this.editForm.patchValue({
      id: povertyCivilian.id,
      reason: povertyCivilian.reason,
      civilian: povertyCivilian.civilian
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

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const povertyCivilian = this.createFromForm();
    if (povertyCivilian.id !== undefined) {
      this.subscribeToSaveResponse(this.povertyCivilianService.update(povertyCivilian));
    } else {
      this.subscribeToSaveResponse(this.povertyCivilianService.create(povertyCivilian));
    }
  }

  private createFromForm(): IPovertyCivilian {
    return {
      ...new PovertyCivilian(),
      id: this.editForm.get(['id'])!.value,
      reason: this.editForm.get(['reason'])!.value,
      civilian: this.editForm.get(['civilian'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPovertyCivilian>>): void {
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

  trackById(index: number, item: ICivilian): any {
    return item.id;
  }
}
